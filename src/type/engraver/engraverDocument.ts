export type EngraverDocument = {
  engraver_id?: number
  file_name: string
  file_path: string
  uploaded_at?: string
}

export type EngraverDocumentUpload = {
  engraverId: number
  documents: File[]
}
