import { Messages, Threads } from '@/server'
import { MessageRole } from '@/enums'
import type { User, Thread, Message } from '@/types'

export class ThreadUtils {
  // Does not create duplicate threads
  public static async createThread(
    user: User,
    uuid: string
  ): Promise<Thread | null> {
    try {
      const threadPartial: Partial<Thread> = {
        user: user._id,
        uuid
      }

      var existingThread: Thread | null = await Threads.findOne<Thread>(
        threadPartial
      )

      if (!existingThread) {
        existingThread = await Threads.create<Thread>(threadPartial)

        if (!existingThread) throw new Error('Could not create thread')
        // create default message
        await this.addMessages(user, existingThread.uuid, [
          {
            role: MessageRole.Assistant,
            content: user.widgetDefaultMessage
          }
        ])
      }

      return existingThread
    } catch (e) {
      console.log(`createThreadIfItDoesNotExist error: ${e}`)
      return null
    }
  }

  public static async addMessages(
    user: User,
    uuid: string,
    partials: Partial<Message>[]
  ): Promise<Message[]> {
    try {
      const thread = await Threads.findOne<Thread>({
        user: user._id,
        uuid
      })

      if (!thread) throw new Error('Could not find any thread')

      var messagePartials: Partial<Message>[] = []
      const now = new Date()
      var counter = 0

      for (const partial of partials) {
        // adjust now here?

        messagePartials.push({
          user: user._id,
          thread: thread._id,
          ...partial,
          // force order
          createdAt: new Date(now.getTime() + counter++)
        })
        counter++
      }

      const messages = (await Messages.create(messagePartials)) as Message[]

      return messages
    } catch (e) {
      console.log(`addMessage error: ${e}`)
      return []
    }
  }
}
