import { isWeekend, isWithinInterval, isSameDay, parseISO } from "date-fns"
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz"

import { utilMonth } from "@/utils/month"
import { isPublicHoliday } from "@/utils/public-holidays"
import { CAPACITY_NORMAL_HOURS, CAPACITY_EXTRA_HOURS, HOURS_REGULAR_DAY } from "@/config/index"
import { REASONS_ABSENCE } from "@/config/index"
import { assertDate } from "./date"

function displayWeek(numWeek, days) {
  // eslint-disable-next-line no-console
  console.log("week", numWeek)

  for (const day of days) {
    // eslint-disable-next-line no-console
    console.log(formatInTimeZone(day, "Europe/Paris", "yyyy-MM-dd"))
  }
}

// Construction de la structure de données pour le mois.
export function buildDataMonth({ hours, absences }) {
  return function ({ year, month }) {
    const dataMonth = {
      meta: {
        year,
        month,
        normalHours: 0,
        extraHours: 0,
        moreExtraHours: 0,
      },
      lastWeekPreviousMonth: {},
      weeks: [],
    }

    const { lastWeekPreviousMonth, weeks } = utilMonth({ year, month })

    dataMonth.lastWeekPreviousMonth = {
      days: lastWeekPreviousMonth.map((day) => ({
        date: day,
        nbHour: 0,
        reasonAbsence: "",
      })),
      hours: {
        capacityNormalHours: CAPACITY_NORMAL_HOURS,
        capacityExtraHours: CAPACITY_EXTRA_HOURS,
        totalHours: 0,
        normalHours: 0,
        extraHours: 0,
        moreExtraHours: 0,
      },
    }

    dataMonth.weeks = weeks.map((week) => ({
      days: week.map((day) => ({
        date: day,
        nbHours: 0,
        reasonAbsence: "",
      })),
      hours: {
        capacityNormalHours: CAPACITY_NORMAL_HOURS,
        capacityExtraHours: CAPACITY_EXTRA_HOURS,
        totalHours: 0,
        normalHours: 0,
        extraHours: 0,
        moreExtraHours: 0,
      },
    }))

    dataMonth.lastWeekPreviousMonth.days = dataMonth.lastWeekPreviousMonth.days.map((day) =>
      fillDay({ hours, absences })(day.date),
    )

    dataMonth.weeks.forEach((week) => {
      week.days = week.days.map((day) => fillDay({ hours, absences })(day.date))
    })

    return dataMonth
  }
}

/**
 * Fonction qui remplit les données du jour.
 *
 * @param {Object} options. hours, la liste des heures modifiées de la garde d'enfant. absences, la liste des absences de la garde d'enfant.
 */
export function fillDay({ hours = [], absences = [] }) {
  return function (date) {
    assertDate(date)

    // la date est-elle un samedi ou dimanche?
    if (isWeekend(date))
      return {
        date,
        reasonAbsence: REASONS_ABSENCE.WE,
      }
    // la date est-elle un jour férié ?
    if (isPublicHoliday(date))
      return {
        date,
        reasonAbsence: REASONS_ABSENCE.PUBLIC_HOLIDAY,
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

/*
const dataMonth = {
  normalHours: 200,
  extraHours: 32,
  moreExtraHours: 10,
  lastWeekPreviousMonth: {
    days: [
      {
        date: "2022-01-31",
        reasonAbsence: "",
        nbHours: 10,
      },
    ],
    capacityNormalHours: 40,
    capacityExtraHours: 8,
    normalHours: 10,
    extraHours: 0,
    moreExtraHours: 0,
  },
  weeks: [
    {
      days: [
        {
          date: "2022-02-01",
          nbHours: 10,
        },
        {
          date: "2022-02-02",
          nbHours: 10,
        },
        {
          date: "2022-02-03",
          nbHours: 10,
        },
        {
          date: "2022-02-04",
          nbHours: 10,
        },
        {
          date: "2022-02-05",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
        {
          date: "2022-02-06",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
      ],
      capacityNormalHours: 30, // 40 - normalHours de la semaine équivalente du mois précédent
      capacityExtraHours: 8, // 8 - extraHours de la semaine équivalente du mois précédent
      totalHours: 40,
      normalHours: 30,
      extraHours: 8,
      moreExtraHours: 2,
    },
    {
      name: "S2",
      days: [
        {
          date: "2022-02-01",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-02",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-03",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-04",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-05",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
        {
          date: "2022-02-06",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
      ],
      capacityNormalHours: 0, // 40 - normalHours de la semaine équivalente du mois précédent
      capacityExtraHours: 8, // 8 - extraHours de la semaine équivalente du mois précédent
      totalHours: 50,
      normalHours: 30,
      extraHours: 8,
      moreExtraHours: 2,
    },
  ],
}
*/
