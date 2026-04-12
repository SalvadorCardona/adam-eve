export interface RepositoryInterface<T> {
  getItem: (id: string) => T | undefined
  getCollection: (query?: object) => T[]
  persistItem: (sujet: T) => void
  removeItem: (id: string) => void
}
