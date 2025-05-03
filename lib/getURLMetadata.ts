import { parser } from 'html-metadata-parser'

interface URLMetadata {
  title: string
  description?: string
  image?: string
}

export const getURLMetadata = async (url: string): Promise<URLMetadata> => {
  var defaultTitle: string

  try {
    defaultTitle = new URL(url).hostname
  } catch {
    defaultTitle = url
  }

  try {
    const metadata = await parser(url)

    return {
      title: metadata.meta.title || metadata.og.title || defaultTitle,
      description:
        metadata.meta.description || metadata.og.description || undefined,
      image: metadata.meta.image || metadata.og.image || undefined
    }
  } catch {
    return {
      title: defaultTitle
    }
  }
}
