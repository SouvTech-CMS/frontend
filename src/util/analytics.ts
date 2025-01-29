export const getIsIncreased = (
  value1?: number,
  value2?: number,
): [number | undefined, boolean | undefined] => {
  if (!value1 || !value2) {
    return [undefined, undefined]
  }

  const diff = value1 - value2
  const isIncreased = diff > 0

  return [diff, isIncreased]
}

export const getPercent = (value?: number, totalValue?: number) => {
  if (!value || !totalValue) {
    return undefined
  }

  return (value / totalValue) * 100
}
