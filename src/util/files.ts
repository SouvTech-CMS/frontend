// NOTE: images and PDFs open in a new tab, other files are downloaded
const VIEWABLE_FILE_TYPES = ["image/", "application/pdf"]

export const openFile = (file: Blob, fileName: string) => {
  const fileUrl = URL.createObjectURL(file)
  const link = document.createElement("a")
  link.href = fileUrl

  const isViewable = VIEWABLE_FILE_TYPES.some((type) =>
    file.type.startsWith(type),
  )
  if (isViewable) {
    link.target = "_blank"
  } else {
    link.download = fileName
  }

  document.body.appendChild(link)
  link.click()
  link.remove()

  // NOTE: the opened tab still reads the file, so revoke the URL later
  setTimeout(() => URL.revokeObjectURL(fileUrl), 60_000)
}
