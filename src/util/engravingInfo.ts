export const parseEngravingInfoStr = (
  engravingInfoStr?: string,
  paramsToExclude?: string[],
) => {
  if (!engravingInfoStr) {
    return []
  }

  // Convert JSON-string to string
  const engravingInfoJSON = JSON.parse(engravingInfoStr)
  const engravingInfo = Object.entries<string>(engravingInfoJSON)

  // Exclude params from Engraving Info
  if (paramsToExclude?.length) {
    return engravingInfo.filter(([key]) => !paramsToExclude.includes(key))
  }

  return engravingInfo
}
