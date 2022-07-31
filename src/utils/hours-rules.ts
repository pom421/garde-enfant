import { CAPACITY_NORMAL_HOURS, CAPACITY_EXTRA_HOURS_25 } from "@/config/config"
import { inYearMonth, subOneMonth, YearMonthType } from "@/utils/date"
import { DayType } from "@/utils/data-month-builder"

export type HoursType = {
  totalHours: number
  totalHoursInWeekSameMonth: number
  normalHours: number
  extraHours25: number
  extraHours50: number
  capacityNormalHours: number
  capacityExtraHours: number
}
const sameMonthPredicate = (yearMonth: YearMonthType) => (day: DayType) => inYearMonth(day.date, yearMonth)

const sameOrPreviousMonthPredicate = (yearMonth: YearMonthType) => (day: DayType) =>
  inYearMonth(day.date, yearMonth) || inYearMonth(day.date, subOneMonth(yearMonth))

export function computeWeekHours(days: DayType[], yearMonth: YearMonthType): HoursType {
  /*
    Règles :
    - si le jour fait partie du mois d'avant, on le prend en compte dans totalHours
    - si le jour fait partie du mois d'après, on ne le prend pas en compte dans totalHours
    - on calcule la même chose juste pour les jours du mois en cours, et on compare
  */

  const hours = {
    totalHours: 0,
    totalHoursInWeekSameMonth: 0,
    normalHours: 0,
    extraHours25: 0,
    extraHours50: 0,
    capacityNormalHours: CAPACITY_NORMAL_HOURS,
    capacityExtraHours: CAPACITY_EXTRA_HOURS_25,
  }

  hours.totalHours = days
    .filter(sameOrPreviousMonthPredicate(yearMonth))
    .reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  const totalHoursInWeekSameMonth = days
    .filter(sameMonthPredicate(yearMonth))
    .reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  const difference = hours.totalHours - totalHoursInWeekSameMonth

  const remainingNormalHours = hours.capacityNormalHours - hours.totalHours

  if (remainingNormalHours >= 0) {
    hours.normalHours = hours.totalHours - difference
    hours.capacityNormalHours -= hours.totalHours
  } else {
    hours.normalHours = hours.capacityNormalHours - difference
    hours.capacityNormalHours = 0

    const remainingExtraHours = hours.capacityExtraHours - Math.abs(remainingNormalHours)

    if (remainingExtraHours >= 0) {
      hours.extraHours25 = Math.abs(remainingNormalHours)
      hours.capacityExtraHours -= Math.abs(remainingNormalHours)
    } else {
      hours.extraHours25 = hours.capacityExtraHours
      hours.capacityExtraHours = 0

      hours.extraHours50 = Math.abs(remainingExtraHours)
    }
  }
  return hours
}
