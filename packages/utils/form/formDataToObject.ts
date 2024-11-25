export default function formDataToObject<T extends Record<string, string>>(
  form: HTMLFormElement,
): T {
  const formData = new FormData(form)

  const object: Record<string, unknown> = {}
  formData.forEach((value, key) => {
    object[key] = value
  })
  return object as T
}
