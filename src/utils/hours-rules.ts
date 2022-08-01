import type { HoursType } from "@/types/types"
import type { DayType } from "@/utils/data-month-builder"

import { CAPACITY_EXTRA_HOURS_25, CAPACITY_NORMAL_HOURS } from "@/config/config"
import { inYearMonth, subOneMonth, YearMonthType } from "@/utils/date"

const sameMonthPredicate = (yearMonth: YearMonthType) => (day: DayType) => inYearMonth(day.date, yearMonth)

const sameOrPreviousMonthPredicate = (yearMonth: YearMonthType) => (day: DayType) =>
  inYearMonth(day.date, yearMonth) || inYearMonth(day.date, subOneMonth(yearMonth))

export function computeWeekHours(days: DayType[], yearMonth: YearMonthType): HoursType {
  // Total des heures de cette semaine, peu importe si c'est à cheval sur 2 mois.
  const totalHoursInWeek = days
    .filter(sameOrPreviousMonthPredicate(yearMonth))
    .reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  // Total des heures de cette semaine, uniquement dans le mois en cours.
  const totalHoursInWeekSameMonth = days
    .filter(sameMonthPredicate(yearMonth))
    .reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  const hoursPreviousMonth = totalHoursInWeek - totalHoursInWeekSameMonth

  // Cacul des heures des jours du mois précédents, si c'est le cas.
  const { normalHours: normalHoursPreviousMonth, extraHours25: extraHours25PreviousMonth } = dispatchHours([
    CAPACITY_NORMAL_HOURS,
    CAPACITY_EXTRA_HOURS_25,
  ])(hoursPreviousMonth)

  // Mise à jour des capacités, si la semaine est à cheval sur 2 mois.
  const capacities = [
    CAPACITY_NORMAL_HOURS - normalHoursPreviousMonth,
    CAPACITY_EXTRA_HOURS_25 - extraHours25PreviousMonth,
  ] as const

  return dispatchHours(capacities)(totalHoursInWeekSameMonth)
}

/**
 * Réparti les heures en 3 catégories : heures normales, heures extra 25%, heures extra 50%.
 */
const dispatchHours = (capacities: Readonly<[number, number]>) => (nbHours: number) => {
  const [maxNormalHours, maxHours25] = capacities
  const normalHoursRemaining = maxNormalHours - nbHours
  const hours25Remaining = maxHours25 + normalHoursRemaining

  return normalHoursRemaining >= 0
    ? {
        normalHours: nbHours,
        extraHours25: 0,
        extraHours50: 0,
        totalHours: nbHours,
      }
    : hours25Remaining >= 0
    ? {
        normalHours: maxNormalHours,
        extraHours25: normalHoursRemaining,
        extraHours50: 0,
        totalHours: nbHours,
      }
    : {
        normalHours: maxNormalHours,
        extraHours25: maxHours25,
        extraHours50: -hours25Remaining,
        totalHours: nbHours,
      }
}
