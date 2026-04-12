export function playSound(soundFileName: string): void {
  const audio = new Audio(soundFileName)
  audio.play().catch((error) => console.error("Error playing sound:", error))
}
