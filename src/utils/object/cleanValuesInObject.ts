import { FilterInterface } from "@/packages/ressource/views/list/filter/useFilter"

export function cleanValuesInObject(filter: FilterInterface): FilterInterface {
  const newFilter = { ...filter }
  Object.keys(newFilter).forEach((key) => {
    const newValue = newFilter[key]
    if (newValue === "" || typeof newValue === "undefined") {
      delete newFilter[key]
    }
    if (Array.isArray(newValue) && newValue.length === 0) {
      delete newFilter[key]
    }
  })

  return newFilter
}
