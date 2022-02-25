import { isWeekend, isWithinInterval, isSameDay, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

import { utilMonth } from "@/utils/month"
import { isPublicHoliday } from "@/utils/public-holidays"
import { CAPACITY_NORMAL_HOURS, CAPACITY_EXTRA_HOURS_25, HOURS_REGULAR_DAY } from "@/config/index"
import type { REASONS_ABSENCE } from "@/config/index"
import { assertDate } from "./date"

function displayWeek(numWeek, days) {
  // eslint-disable-next-line no-console
  console.log("week", numWeek)

  for (const day of days) {
    // eslint-disable-next-line no-console
    console.log(formatInTimeZone(day, "Europe/Paris", "yyyy-MM-dd"))
  }
}

type DayType = {
  date: Date
  nbHours: number
  reasonAbsence?: REASONS_ABSENCE
}

type DataMonthType = {
  // lastWeekPreviousMonth: {
  //   // numWeek: number
  //   days: DayType[]
  // }
  weeks: {
    // numWeek: number
    days: DayType[]
  }[]
}

// Construction de la structure de données pour le mois.
export function buildDataMonth({ hours, absences }) {
  return function ({ year, month }) {
    const { weeks } = utilMonth({ year, month })

    const dataMonth: DataMonthType = {
      // lastWeekPreviousMonth: {
      //   days: lastWeekPreviousMonth.map((date) => fillDay({ hours, absences })(date)),
      // },
      weeks: weeks.map((week) => ({
        days: week.map((date) => fillDay({ hours, absences })(date)),
      })),
    }

    return dataMonth
  }
}

/**
 * Fonction qui remplit les données du jour.
 *
 * @param {Object} options. hours, la liste des heures modifiées de la garde d'enfant. absences, la liste des absences de la garde d'enfant.
 */
export function fillDay({ hours = [], absences = [] }) {
  return function (date): { date: Date; reasonAbsence?: REASONS_ABSENCE; nbHours: number } {
    assertDate(date)

    // la date est-elle un samedi ou dimanche?
    if (isWeekend(date))
      return {
        date,
        nbHours: 0,
        reasonAbsence: "WE",
      }
    // la date est-elle un jour férié ?
    if (isPublicHoliday(date))
      return {
        date,
        nbHours: 0,
        reasonAbsence: "PUBLIC_HOLIDAY",
      }

    // la date a-t-elle des heures explicites ?
    const [entryHours] = hours.filter((hour) => isSameDay(parseISO(hour.date), date)) // on considère qu'il ne peut pas y avoir 2 entrées pour la même date.

    if (entryHours) {
      return {
        date,
        nbHours: entryHours.nbHours,
      }
    }
    // la date est-elle une absence ?
    // eslint-disable-next-line prettier/prettier
    for (const absence of absences) {
      if (isWithinInterval(date, { start: parseISO(absence.start), end: parseISO(absence.end) })) {
        return {
          date,
          nbHours: 0,
          reasonAbsence: absence.reason,
        }
      }
    }

    // par défaut, on ajoute le nombre d'heure standard.
    return {
      date,
      nbHours: HOURS_REGULAR_DAY,
    }
  }
}

export function getHoursInWeek(week: { days: DayType[] }) {
  //   /*
  //     {
  //       totalHoursInWeek: number
  //       totalHoursInWeekSameMonth: number
  //       normalHours: number
  //       extraHours25: number
  //       extraHours50: number
  //     }
  //   */
  const hours = {
    totalHours: 0,
    normalHours: 0,
    extraHours25: 0,
    extraHours50: 0,
    capacityNormalHours: CAPACITY_NORMAL_HOURS,
    capacityExtraHours: CAPACITY_EXTRA_HOURS_25,
  }

  const totalHours = week.days.reduce((acc, day) => acc + (day.nbHours ?? 0), 0)
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
