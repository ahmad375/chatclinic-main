import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions'

const useGPT4 = true

export const model: ChatCompletionCreateParamsBase['model'] = useGPT4
  ? 'gpt-4-1106-preview'
  : 'gpt-3.5-turbo-1106'
