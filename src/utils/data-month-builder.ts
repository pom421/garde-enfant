import { isWeekend, isWithinInterval, parseISO } from "date-fns"

import type { AbsenceType, DataWeeksType, REASONS_ABSENCE } from "@/types/types"

import { INFOS_ABSENCE } from "@/config/config"
import { hoursRegularDay } from "@/data/app"
import { assertDate, YearMonthType } from "@/utils/date"
import { helpersForMonth } from "@/utils/month"
import { isPublicHoliday } from "@/utils/public-holidays"

// Construction de la structure de données pour le mois : tableau représentant les semaines, chaque semaine contenant un tableau de jours.
export function buildDataWeeks({ absences = [] } = { absences: [] }) {
  return function (yearMonth: YearMonthType): DataWeeksType {
    const { weeks } = helpersForMonth(yearMonth)

    const fillDay = fillDayBuilder({ absences })

    return weeks.map((week) => ({
      days: week.map((date) => fillDay(date)),
    }))
  }
}

/**
 * Fonction qui remplit les données du jour.
 *
 * @param {Object} options. hours, la liste des heures modifiées de la garde d'enfant. absences, la liste des absences de la garde d'enfant.
 */
export function fillDayBuilder({ absences = [] }: { absences?: AbsenceType[] }) {
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

    // la date est-elle une absence ?
    for (const absence of absences) {
      if (isWithinInterval(date, { start: parseISO(absence.start), end: parseISO(absence.end) })) {
        return {
          date,
          nbHours: INFOS_ABSENCE[absence.reason].nbHours,
          reasonAbsence: absence.reason,
        }
      }
    }

    // par défaut, on ajoute le nombre d'heure standard.
    return {
      date,
      nbHours: hoursRegularDay,
    }
  }
}
