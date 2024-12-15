//
// export function playSound(soundUrl: string): Promise<ThreeAudio> {
//   const listener = new ThreeAudioListener()
//   const three = useThree()
//   three.camera.add(listener)
//   const sound = new ThreeAudio(listener)
//
//   const audioLoader = new AudioLoader()
//   return new Promise((resolve) => {
//     audioLoader.load(soundUrl, function (buffer) {
//       sound.setBuffer(buffer)
//       sound.setVolume(0.5)
//       sound.play()
//       resolve(sound)
//     })
//   })
// }

export function playSound(soundFileName: string): void {
  const audio = new Audio(soundFileName)
  audio.play().catch((error) => console.error("Error playing sound:", error))
}
