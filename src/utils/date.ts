import { formatInTimeZone } from "date-fns-tz"

export function assertDate(value) {
  if (typeof value === "object" && value instanceof Date) {
    return
  }
  throw new Error(`Error: a date is expected. Got ${JSON.stringify(value, null, 2)} which is a(n) ${typeof value}`)
}

// Aide au débugage, pour avoir un affichage plus lisible
export function displayWeek(dates) {
  for (const date of dates) {
    // eslint-disable-next-line no-console
    console.log(formatInTimeZone(date, "Europe/Paris", "yyyy-MM-dd"))
  }
}
