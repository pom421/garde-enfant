import { getMonth, getYear } from "date-fns"
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

export const inYearMonth = (date: Date, [year, month]: YearMonthType): boolean =>
  year === getYear(date) && month === getMonth(date)

export type YearMonthType = Readonly<[number, number]>

export const addOneMonth = (yearMonth: YearMonthType): YearMonthType => [
  yearMonth[1] === 11 ? yearMonth[0] + 1 : yearMonth[0],
  (yearMonth[1] + 1) % 12,
]

export const subOneMonth = (yearMonth: YearMonthType): YearMonthType => [
  yearMonth[1] === 0 ? yearMonth[0] - 1 : yearMonth[0],
  yearMonth[1] === 0 ? 11 : yearMonth[1] - 1,
]
