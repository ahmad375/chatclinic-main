import type { ChatCompletionCreateParamsStreaming } from 'openai/resources/chat/index'
import { model, functions } from '.'

export const chatCompletionConfig: Pick<
  ChatCompletionCreateParamsStreaming,
  'model' | 'functions' | 'stream' | 'stop'
> = {
  model,
  functions,
  stream: true
}
