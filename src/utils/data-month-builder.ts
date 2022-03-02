import { isWeekend, isWithinInterval, isSameDay, parseISO } from "date-fns"

import { utilMonth } from "@/utils/month"
import { isPublicHoliday } from "@/utils/public-holidays"
import { HOURS_REGULAR_DAY } from "@/config/index"
import type { REASONS_ABSENCE } from "@/config/index"
import { assertDate, YearMonthType } from "@/utils/date"
import { AbsenceType, HourType } from "@/data/app"

export type DayType = {
  date: Date
  nbHours: number
  reasonAbsence?: REASONS_ABSENCE
}

type DataWeeksType = { days: DayType[] }[]

// Construction de la structure de données pour le mois.
export function buildDataWeeks({ hours = [], absences = [] } = { hours: [], absences: [] }) {
  return function (yearMonth: YearMonthType): DataWeeksType {
    const { weeks } = utilMonth(yearMonth)

    return weeks.map((week) => ({
      days: week.map((date) => fillDay({ hours, absences })(date)),
    }))
  }
}

/**
 * Fonction qui remplit les données du jour.
 *
 * @param {Object} options. hours, la liste des heures modifiées de la garde d'enfant. absences, la liste des absences de la garde d'enfant.
 */
export function fillDay({ hours = [], absences = [] }: { hours?: HourType[]; absences?: AbsenceType[] }) {
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
          nbHours: absence.reason === "SICKNESS" ? HOURS_REGULAR_DAY / 2 : 0,
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
