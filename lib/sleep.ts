export const sleep = async (seconds: number): Promise<boolean> =>
  await new Promise(() => setTimeout(() => {}, seconds * 1_000))
