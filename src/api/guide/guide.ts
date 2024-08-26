import axios from "axios"
import { NOTION_API_URL } from "constant/guides"
import { BlockMapType } from "react-notion"

export const getNotionGuideById = async (
  guideId: string,
): Promise<BlockMapType> => {
  const { data: guideContent } = await axios.get(`${NOTION_API_URL}/${guideId}`)
  return guideContent
}
