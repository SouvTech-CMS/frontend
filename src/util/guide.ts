const notionPageIdRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const parseGuideId = (id?: string) => {
  if (!id) {
    return undefined
  }

  const isPageIdValid = notionPageIdRegex.test(id)
  if (isPageIdValid) {
    return id
  }

  const part1 = id.slice(0, 8)
  const part2 = id.slice(8, 12)
  const part3 = id.slice(12, 16)
  const part4 = id.slice(16, 20)
  const part5 = id.slice(20)

  const parsedId = `${part1}-${part2}-${part3}-${part4}-${part5}`

  return parsedId
}
