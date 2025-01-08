import { ShelfWithPlacement } from "type/shelf/shelf"

const SHELF_DELIMITER = ";"

export const parseShelves = (shelves?: string) => {
  if (!!shelves) {
    const parsedList = shelves.split(SHELF_DELIMITER)

    //* Remove empty strings
    const filteredList = parsedList.filter(Boolean)

    return filteredList
  }

  return []
}

export const combineShelves = (shelvesList: string[]) => {
  return shelvesList.join(SHELF_DELIMITER)
}

export const getShelfFullCode = (shelf: ShelfWithPlacement) => {
  const placement = shelf.shelf_placement

  const isPlacementExists = !!placement
  if (!isPlacementExists) {
    return `${shelf.name}`
  }

  const fullCode = `${placement.name_hash}-${shelf.name}`
  return fullCode
}

export const combineShelfWithPlacementCode = (
  placementCode: string,
  shelfCode: string,
) => {
  const fullCode = `${placementCode}-${shelfCode}`
  return fullCode
}
