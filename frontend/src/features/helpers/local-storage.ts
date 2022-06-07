export const setLocalItem = (fieldName: string, value: string) => {
  localStorage.setItem(fieldName, value)
}

export const getLocalItem = (fieldName: string) => {
  return localStorage.getItem(fieldName)
}
