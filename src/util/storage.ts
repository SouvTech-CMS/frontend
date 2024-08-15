export const countTotalParamSum = (objList: any[], param: string) => {
  return objList.reduce((total, obj) => total + obj[param], 0)
}
