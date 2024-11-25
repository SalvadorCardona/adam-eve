export function formatDate(date: Date | string | null | undefined): string {
  if (!date) {
    return "-"
  }

  if (typeof date === "string") {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat("fr").format(date)
}

export function getYear(date: Date | string | null | undefined): string {
  if (!date) {
    return "-"
  }

  if (typeof date === "string") {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat("fr", { year: "numeric" }).format(date)
}
