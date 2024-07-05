export const getBadgeColor = (status: string): string => {
  switch (status) {
    case "order":
      return "blue"
    case "invoice":
      return "cyan"
    case "processing":
      return "yellow"
    case "packing":
      return "purple"
    case "custom":
      return "teal"
    case "storage":
      return "green"
    default:
      return "gray"
  }
}
