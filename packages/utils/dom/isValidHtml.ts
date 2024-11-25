const isValidHtml = (str: string): boolean => {
  const regex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i
  if (!regex.test(str)) {
    return false
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(str, "text/html")
  return doc.body.firstChild !== null
}

export default isValidHtml
