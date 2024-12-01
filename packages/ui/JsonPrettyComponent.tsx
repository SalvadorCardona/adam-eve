export interface JsonPrettyComponentPropsInterface {
  data: Record<string, any>
}

export default function JsonPrettyComponent({
  data,
}: JsonPrettyComponentPropsInterface) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
