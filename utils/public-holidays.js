import moize from "moize"
import joursFeries from "@socialgouv/jours-feries"
import { getYear, isSameDay } from "date-fns"

const memoizedPublicHolidays = (year) => Object.values(moize(joursFeries)(year))

export function isPublicHoliday(date) {
  // Est-ce que le jour fait partie des jours fériés de l'année ?
  return memoizedPublicHolidays(getYear(date)).some((holidayDay) => isSameDay(date, holidayDay))
}
