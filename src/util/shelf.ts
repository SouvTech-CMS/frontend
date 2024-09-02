const SHELF_DELIMITER = ";"

export const parseShelfs = (shelfs?: string) => {
  if (!!shelfs) {
    const parsedList = shelfs.split(SHELF_DELIMITER)

    //* Remove empty strings
    const filteredList = parsedList.filter(Boolean)

    return filteredList
  }

  return []
}

export const combineShelfs = (shelfsList: string[]) => {
  return shelfsList.join(SHELF_DELIMITER)
}
