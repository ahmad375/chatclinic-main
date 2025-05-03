import { MinimumAPITimeDelay } from '.'

export const withMinimumDelay = async <T>(
  asyncFn: () => Promise<T>,
  minimumDelay: number = MinimumAPITimeDelay
): Promise<T> => {
  const startTime = Date.now()

  const result: T = await asyncFn()

  const timeTaken = Date.now() - startTime
  if (timeTaken < minimumDelay) {
    await new Promise((resolve) =>
      setTimeout(resolve, minimumDelay - timeTaken)
    )
  }

  return result
}
