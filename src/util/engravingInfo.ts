import { GoodListingParams } from "type/engraver/engravingInfo"

const PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO = [
  "listing_id",
  "product_id",
  "transaction_type",
  "OriginalSKU",
]

export const getEtsyGoodListingUrl = (
  listingId?: number,
  productId?: number,
) => {
  if (!listingId || !productId) {
    return
  }

  const url = `https://www.etsy.com/listing/${listingId}?transaction_id=${productId}`
  return url
}

export const parseEngravingInfoStr = (engravingInfoStr?: string) => {
  if (!engravingInfoStr) {
    return { engravingInfo: undefined, goodListingParams: undefined }
  }

  // Convert JSON-string to object
  const engravingInfoJSON = JSON.parse(engravingInfoStr)
  const engravingInfo = Object.entries<string>(engravingInfoJSON)

  // Exclude params from Engraving Info
  const filteredEngravingInfo = engravingInfo
    .filter(([key]) => !PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO.includes(key))
    .sort((a, b) => a[0].localeCompare(b[0]))

  const goodListingParams: GoodListingParams = Object.fromEntries(
    engravingInfo.filter(([key]) =>
      PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO.includes(key),
    ),
  ) as GoodListingParams

  return { engravingInfo: filteredEngravingInfo, goodListingParams }
}
