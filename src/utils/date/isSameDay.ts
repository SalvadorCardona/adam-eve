function deSerializerDate(date: string | Date): Date {
  return typeof date === "string" ? new Date(date) : date
}

export default function isSameDay(
  date1: Date | string,
  date2: Date | string,
): boolean {
  date1 = deSerializerDate(date1)
  date2 = deSerializerDate(date2)

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}
