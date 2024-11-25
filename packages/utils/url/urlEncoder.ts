import { FilterInterface } from "@/packages/ressource/views/list/filter/useFilter"

export const encodeQuery = (data: FilterInterface): string => {
  return encodeURI(JSON.stringify(data))
}
export const decodeQuery = (url: string): FilterInterface => {
  return JSON.parse(decodeURI(url))
}
