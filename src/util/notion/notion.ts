import { BlockMapType } from "react-notion"

export const getPageTitle = (guideId: string, content: BlockMapType) => {
  return content[guideId].value.properties["title"][0][0]
}
