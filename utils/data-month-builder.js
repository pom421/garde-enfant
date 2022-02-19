import { isWeekend, isWithinInterval, isSameDay, parseISO } from "date-fns"

import { utilMonth } from "@/utils/month"
import { isPublicHoliday } from "@/utils/public-holidays"
import { absences, hours } from "data/app"
import { CAPACITY_NORMAL_HOURS, CAPACITY_EXTRA_HOURS, HOURS_REGULAR_DAY } from "@/config/index"

// Construction de la structure de données pour le mois.
export function buildDataMonth({ year, month }) {
  const dataMonth = {
    hours: {
      normalHours: 0,
      extraHours: 0,
      moreExtraHours: 0,
    },
    lastWeekPreviousMonth: {},
    weeks: [],
  }

  const { lastWeekPreviousMonth, weeks } = utilMonth({ year, month })

  console.log("lastWeekPreviousMonth", lastWeekPreviousMonth)

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

  lastWeekPreviousMonth.days = lastWeekPreviousMonth.map((day) => fillDay(day))

  console.log("new lastWeekPreviousMonth", lastWeekPreviousMonth)

  // TODO : remlpir les weeks comme lastWeekPreviousMonth

  return dataMonth
}

/*
 * TODO : tester cette fonction !!!
 */
function fillDay(date) {
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
  const [entryHours] = hours.filter((hour) => isSameDay(parseISO(hour.date), date)) // on considère qu'on ne peut spécifier qu'une fois une hour.

  if (entryHours)
    return {
      date,
      nbHours: entryHours,
    }

  // la date est-elle une absence ?
  absences.forEach((absence) => {
    if (isWithinInterval(date, { start: parseISO(absence.start), end: parseISO(absence.end) })) {
      return {
        date,
        reasonAbsence: absence.reason,
      }
    }
  })

  // par défaut, on ajoute le nombre d'heure standard.
  return {
    date,
    nbHours: HOURS_REGULAR_DAY,
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
