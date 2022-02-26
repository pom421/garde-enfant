import { CAPACITY_NORMAL_HOURS, CAPACITY_EXTRA_HOURS_25 } from "@/config/index"
import { inYearMonth, subOneMonth, YearMonthType } from "@/utils/date"
import { DayType } from "@/utils/data-month-builder"

export function computeWeekHours(days: DayType[], yearMonth: YearMonthType) {
  //   /*
  //     {
  //       totalHoursInWeek: number
  //       totalHoursInWeekSameMonth: number
  //       normalHours: number
  //       extraHours25: number
  //       extraHours50: number
  //     }
  //   */

  /*
      Règles :
      - si le jour fait partie du mois d'avant, on le prend en compte dans totalHours
      - si le jour fait partie du mois d'après, on ne le prend pas en compte dans totalHours
      - on calcule la même chose juste pour les jours du mois en cours, et on compare
     */

  const hours = {
    totalHours: 0,
    totalHoursOnlyMonth: 0,
    normalHours: 0,
    extraHours25: 0,
    extraHours50: 0,
    capacityNormalHours: CAPACITY_NORMAL_HOURS,
    capacityExtraHours: CAPACITY_EXTRA_HOURS_25,
  }

  const sameMonthPredicate = (day: DayType) => inYearMonth(day.date, yearMonth)

  const sameOrPreviousMonthPredicate = (day: DayType) =>
    inYearMonth(day.date, yearMonth) || inYearMonth(day.date, subOneMonth(yearMonth))

  // const totalHours = days.reduce((acc, day) => acc + (day.nbHours ?? 0), 0)
  const totalHours = days.filter(sameOrPreviousMonthPredicate).reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  const totalHoursOnlyMonth = days.filter(sameMonthPredicate).reduce((acc, day) => acc + (day.nbHours ?? 0), 0)

  // TODO : comparer les 2 totalHours.
  // Si les mêmes, on continue comme avant.
  // Sinon, on prend le maximum, pour ventiler sur les erreurs sup 25 et 50.
  // Ensuite, on prend les heures totales moins les heures du mois, ce seront les heures normales.

  hours.totalHours = totalHours

  const restant = hours.capacityNormalHours - totalHours

  if (restant >= 0) {
    hours.normalHours = totalHours
    hours.capacityNormalHours -= totalHours
  } else {
    hours.normalHours = hours.capacityNormalHours
    hours.capacityNormalHours = 0

    const restantExtraHours = hours.capacityExtraHours - Math.abs(restant)

    if (restantExtraHours >= 0) {
      hours.extraHours25 = Math.abs(restant)
      hours.capacityExtraHours -= Math.abs(restant)
    } else {
      hours.extraHours25 = hours.capacityExtraHours
      hours.capacityExtraHours = 0

      hours.extraHours50 = Math.abs(restantExtraHours)
    }
  }
  return hours
}
