export default function getDaysInMonth(year: number, month: number): Date[] {
  const daysInMonth = []
  const date = new Date(year, month, 1)

  while (date.getMonth() === month) {
    daysInMonth.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return daysInMonth
}
