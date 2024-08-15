export const getPagesCount = (
  rowsPerPageCount: number,
  objectsCount?: number,
) => {
  if (objectsCount === undefined) {
    return 0
  }

  return Math.ceil(objectsCount / rowsPerPageCount)
}
