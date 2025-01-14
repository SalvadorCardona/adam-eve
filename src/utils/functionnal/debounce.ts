export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>): void {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
