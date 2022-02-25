import moize from "moize"
import joursFeries from "@socialgouv/jours-feries"
import { getYear, isSameDay } from "date-fns"
import { assertDate } from "./date"

const memoizedPublicHolidays = (year) => Object.values(moize(joursFeries)(year))

export function isPublicHoliday(date) {
  assertDate(date)

  // Est-ce que le jour fait partie des jours fériés de l'année ?
  return memoizedPublicHolidays(getYear(date)).some((holidayDay: Date) => isSameDay(date, holidayDay))
}
