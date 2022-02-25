import {
  getMonth,
  previousMonday,
  nextSunday,
  lastDayOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  startOfWeek,
  getWeeksInMonth,
  getISOWeek,
  startOfISOWeek,
  setISOWeek,
  lastDayOfISOWeek,
  endOfWeek,
} from "date-fns"

// type UtilMonthReturnType = {
//   firstDayOfMonth: Date
//   previousMondayBeforeMonth: Date
//   lastDayOfCurrentMonth: Date
//   nextSundayAfterMonth: Date
//   eachDayOfOfCurrentMonth: Date[]
//   nbWeeks: number
//   lastWeekPreviousMonth: Date[]
//   weeks: Date[][]
// }

type UtilMonthReturnType = {
  firstDay: Date
  lastDay: Date
  mondayFirstWeek: Date
  sundayLastWeek: Date
  nbWeeks: number
  days: Date[]
  daysAllWeeks: Date[]
  weeks: Date[][]
  mondays: Date[]
}

export function utilMonth({ year, month }): UtilMonthReturnType {
  const firstDay = new Date(year, month, 1)
  const lastDay = lastDayOfMonth(firstDay)
  const weeks = eachWeekOfInterval({ start: firstDay, end: lastDay }, { weekStartsOn: 1 }).map((monday) => {
    return eachDayOfInterval({ start: monday, end: nextSunday(monday) })
  })
  const nbWeeks = weeks.length - 1
  const mondayFirstWeek = weeks[0][0]
  const sundayLastWeek = weeks[nbWeeks][6]
  const mondays = weeks.map((week) => week[0])

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  })

  const daysAllWeeks = eachDayOfInterval({
    start: mondayFirstWeek,
    end: sundayLastWeek,
  })

  return {
    firstDay,
    lastDay,
    mondayFirstWeek,
    sundayLastWeek,
    nbWeeks,
    days,
    daysAllWeeks,
    weeks,
    mondays,
  }
}

export function utilWeek(date) {
  const firstDay = previousMonday(date)
  const lastDay = nextSunday(date)
  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  })

  return {
    firstDay,
    lastDay,
    days,
  }
}

// /**
//  * Utilitaires pour le mois
//  *
//  * @param {number} year
//  * @param {number} month 0-11
//  */
// export function utilMonth({ year, month }): UtilMonthReturnType {
//   const firstDayOfMonth = new Date(year, month, 1)
//   const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
//   const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
//   const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

//   const eachDayOfOfCurrentMonth = eachDayOfInterval({
//     start: previousMondayBeforeMonth,
//     end: nextSundayAfterMonth,
//   })

//   const weeks = eachWeekOfInterval({ start: firstDayOfMonth, end: lastDayOfCurrentMonth }, { weekStartsOn: 1 }).map(
//     (monday) => {
//       return eachDayOfInterval({ start: monday, end: nextSunday(monday) })
//     },
//   )

//   // On construit les jours de la semaine précédente du mois précédent.
//   const lastWeekPreviousMonth = []

//   // On stocke ici les vrais jours du mois pour la semaine 1.
//   const daysFromWeek1 = []

//   for (const day of weeks[0]) {
//     if (getMonth(day) === month) {
//       daysFromWeek1.push(day)
//     } else {
//       lastWeekPreviousMonth.push(day)
//     }
//   }

//   // On écrase avec les vraies valeurs de la semaine 1.
//   weeks[0] = daysFromWeek1

//   // On supprime les jours en trop de la dernière semaine.
//   weeks[weeks.length - 1] = weeks[weeks.length - 1].filter((day) => getMonth(day) === month)

//   return {
//     firstDayOfMonth,
//     previousMondayBeforeMonth,
//     lastDayOfCurrentMonth,
//     nextSundayAfterMonth,
//     eachDayOfOfCurrentMonth,
//     nbWeeks: weeks ? weeks.length : 0,
//     lastWeekPreviousMonth,
//     weeks,
//   }
// }
