import uniqid from "uniqid"

export default function createUniqId(): string {
  return uniqid()

  // const randomArray = new Uint32Array(1)
  // crypto.getRandomValues(randomArray)
  // return randomArray[0].toString(36)
}
