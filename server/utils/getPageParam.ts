export const getPageParam = (req: Request): number => {
  try {
    const { searchParams } = new URL(req.url)
    const pageParam = searchParams.get('page') as string | null
    if (!pageParam) throw new Error()
    const p = parseInt(pageParam)
    if (isNaN(p)) throw new Error()
    return p
  } catch {
    return 1
  }
}
