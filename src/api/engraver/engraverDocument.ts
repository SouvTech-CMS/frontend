import { axiosClient } from "api/axiosClient"
import { EngraverDocumentUpload } from "type/engraver/engraverDocument"

export const uploadDocuments = async (body: EngraverDocumentUpload) => {
  const formData = new FormData()
  body.documents.forEach((file) => {
    formData.append("documents_list", file)
  })

  await axiosClient.postForm(`/engraver/document/${body.engraverId}`, formData)
}

export const deleteDocuments = async (engraverId: number) => {
  await axiosClient.delete(`/engraver/document/${engraverId}`)
}
