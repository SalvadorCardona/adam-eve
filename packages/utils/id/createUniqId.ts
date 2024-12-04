export default function createUniqId(): string {
  const randomArray = new Uint32Array(1)
  crypto.getRandomValues(randomArray)
  return randomArray[0].toString(36)
}
