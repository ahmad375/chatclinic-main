import { appendFileSync, writeFileSync } from 'fs'
import { FineTuneData, getSystemMessage, functions } from '@/lib'

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'development') throw new Error()

    writeFileSync('finetune.jsonl', '')

    const stopToken = '######'

    for (const item of FineTuneData) {
      const dataObject = {
        messages: [
          getSystemMessage({}),
          {
            role: 'assistant',
            content: 'Hello, how can I help you today?' + stopToken
          },
          // inject custom stop token
          ...item.map((item) =>
            item.role === 'assistant'
              ? { ...item, content: item.content + stopToken }
              : item
          )
        ],
        functions
      }

      const jsonString = JSON.stringify(dataObject)

      appendFileSync('finetune.jsonl', jsonString + '\n')
    }

    return new Response(
      JSON.stringify({
        success: true
      }),
      {
        status: 200
      }
    )
  } catch {
    return new Response(
      JSON.stringify({
        success: false
      }),
      {
        status: 200
      }
    )
  }
}
