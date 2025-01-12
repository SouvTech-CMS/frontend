import { deleteDocuments, uploadDocuments } from "api/engraver/engraverDocument"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useEngraverDocumentCreateMutation = () => {
  return useMutation(uploadDocuments, {
    onSuccess: () => {
      queryClient.invalidateQueries("engraversList")
    },
  })
}

export const useEngraverDocumentDeleteMutation = () => {
  return useMutation(deleteDocuments, {
    onSuccess: () => {
      queryClient.invalidateQueries("engraversList")
    },
  })
}
