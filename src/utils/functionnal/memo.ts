export function createMemo<T>(fn: () => T, deps: any[]): () => T {
  let cache: T | undefined = undefined
  let prevDeps: any[] = []

  return () => {
    const hasChanged = deps.some((dep, i) => dep !== prevDeps[i])

    if (cache === undefined || hasChanged) {
      cache = fn()
      prevDeps = [...deps]
    }

    return cache
  }
}
