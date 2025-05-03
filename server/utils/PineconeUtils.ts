import OpenAI from 'openai'
import { Pinecone, Index } from '@pinecone-database/pinecone'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ScrapingBeeClient } from 'scrapingbee'
import type {
  Question,
  User,
  Document,
  RecordMetadata,
  Page as IPage,
  Video
} from '@/types'

export class PineconeUtils {
  private user: User
  private index: Index<RecordMetadata>
  private embeddings: OpenAIEmbeddings
  private openai: OpenAI
  private static SIMILARITY_THRESHOLD = 0.8
  private static CHUNK_SIZE = 1_000
  private static CHUNK_OVERLAP = 200

  // All Pinecone operations are scoped to a user
  public constructor(user: User) {
    this.user = user
    const pinecone = new Pinecone()
    // use default namespace, or ''
    this.index = pinecone.index(process.env.PINECONE_INDEX!).namespace('')
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    })
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  public async vectorizeURL(
    url: string,
    metadata: RecordMetadata
  ): Promise<boolean> {
    try {
      const client = new ScrapingBeeClient(process.env.SCRAPING_BEE_API_KEY!)
      const clientRes = await client.get({
        url,
        params: {
          extract_rules: {
            text: 'body'
          }
        }
      })
      const decoder = new TextDecoder()
      const text = decoder.decode(clientRes.data)

      if (!text || text.trim() === '')
        throw new Error('No text parsed from page')

      return await this.vectorizeText(text, metadata)
    } catch (e) {
      console.log(`PineconeUtils.vectorizeURL error: ${e}`)

      return false
    }
  }

  public async vectorizeYouTubeVideo(
    url: string,
    metadata: RecordMetadata
  ): Promise<boolean> {
    return this.vectorize(
      YoutubeLoader.createFromUrl(url, {
        language: 'en',
        addVideoInfo: true
      }),
      metadata
    )
  }

  public async vectorizeText(
    text: string,
    metadata: RecordMetadata
  ): Promise<boolean> {
    return this.vectorize(
      new TextLoader(
        new Blob([text], {
          type: 'text/plain'
        })
      ),
      metadata
    )
  }

  public async vectorize(
    loader: TextLoader | YoutubeLoader,
    metadata: RecordMetadata
  ): Promise<boolean> {
    try {
      const documents = await loader.loadAndSplit(
        new RecursiveCharacterTextSplitter({
          chunkSize: PineconeUtils.CHUNK_SIZE,
          chunkOverlap: PineconeUtils.CHUNK_OVERLAP
        })
      )

      for (const document of documents) {
        document.metadata = {
          ...document.metadata,
          ...metadata
        }
      }

      const store = new PineconeStore(this.embeddings, {
        pineconeIndex: this.index,
        textKey: 'text'
      })

      await store.addDocuments(documents)

      return true
    } catch (e) {
      console.log(`PineconeUtils.vectorize error: ${e}`)
      return false
    }
  }

  public async vectorizeQuestion(question: Question): Promise<boolean> {
    return this.vectorizeText(`${question.question} ${question.answer}`, {
      user: this.user._id.toString(),
      question: question._id.toString()
    })
  }

  public async vectorizeDocument(document: Document): Promise<boolean> {
    return this.vectorizeText(
      // Note that we use plain content as it is unformatted
      `${document.title} ${document.subtitle} ${document.plainContent}`,
      {
        user: this.user._id.toString(),
        document: document._id.toString()
      }
    )
  }

  public async vectorizePage(page: IPage): Promise<boolean> {
    return this.vectorizeURL(page.url, {
      user: this.user._id.toString(),
      page: page._id.toString()
    })
  }

  public async vectorizeVideo(video: Video): Promise<boolean> {
    return this.vectorizeYouTubeVideo(video.url, {
      user: this.user._id.toString(),
      video: video._id.toString()
    })
  }

  public async __dangerouslyDeleteAllVectors(): Promise<boolean> {
    try {
      throw new Error()

      await this.index.deleteAll()

      return true
    } catch (e) {
      console.log(`PineconeUtils.dangerouslyDeleteAllVectors error: ${e}`)
      return false
    }
  }

  public async deleteVectors(metadata: RecordMetadata): Promise<boolean> {
    try {
      await this.index.deleteMany(metadata)

      return true
    } catch (e) {
      console.log(`PineconeUtils.deleteVectors error: ${e}`)
      return false
    }
  }

  public async deleteQuestionVectors(questionId: string): Promise<boolean> {
    return this.deleteVectors({
      user: this.user._id.toString(),
      question: questionId
    })
  }

  public async deleteDocumentVectors(documentId: string): Promise<boolean> {
    return this.deleteVectors({
      user: this.user._id.toString(),
      document: documentId
    })
  }

  public async deletePageVectors(pageId: string): Promise<boolean> {
    return this.deleteVectors({
      user: this.user._id.toString(),
      page: pageId
    })
  }

  public async deleteVideoVectors(videoId: string): Promise<boolean> {
    return this.deleteVectors({
      user: this.user._id.toString(),
      video: videoId
    })
  }

  public async query(text: string): Promise<RecordMetadata[]> {
    try {
      const embeddingResponse = await this.openai.embeddings.create({
        input: text,
        model: 'text-embedding-ada-002'
      })
      const embedding = embeddingResponse.data[0].embedding

      const { matches } = await this.index.query({
        vector: embedding,
        topK: 3,
        filter: {
          user: this.user._id.toString()
        },
        includeValues: false,
        includeMetadata: true
      })

      const results: RecordMetadata[] = []

      for (const doc of matches) {
        if (
          doc.metadata?.text &&
          doc.score &&
          doc.score > PineconeUtils.SIMILARITY_THRESHOLD
        )
          results.push(doc.metadata)
      }

      return results
    } catch {
      return []
    }
  }
}
