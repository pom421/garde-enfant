import { getMonth, previousMonday, nextSunday, lastDayOfMonth, eachDayOfInterval, eachWeekOfInterval } from "date-fns"

// Utilitaires pour le mois
export function utilMonth({ year, month }) {
  const firstDayOfMonth = new Date(year, month, 1)
  const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
  const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
  const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

  const eachDayOfOfCurrentMonth = eachDayOfInterval({
    start: previousMondayBeforeMonth,
    end: nextSundayAfterMonth,
  })

  const weeks = eachWeekOfInterval({ start: firstDayOfMonth, end: lastDayOfCurrentMonth }, { weekStartsOn: 1 }).map(
    (monday) => {
      return eachDayOfInterval({ start: monday, end: nextSunday(monday) })
    },
  )

  // On construit les jours de la semaine précédente du mois précédent.
  const lastWeekPreviousMonth = []

  // On stocke ici les vrais jours du mois pour la semaine 1.
  const daysFromWeek1 = []

  for (const day of weeks[0]) {
    if (getMonth(day) === month) {
      daysFromWeek1.push(day)
    } else {
      lastWeekPreviousMonth.push(day)
    }
  }

  // On écrase avec les vraies valeurs de la semaine 1.
  weeks[0] = daysFromWeek1

  // On supprime les jours en trop de la dernière semaine.
  weeks[weeks.length - 1] = weeks[weeks.length - 1].filter((day) => getMonth(day) === month)

  return {
    firstDayOfMonth,
    previousMondayBeforeMonth,
    lastDayOfCurrentMonth,
    nextSundayAfterMonth,
    eachDayOfOfCurrentMonth,
    nbWeeks: weeks ? weeks.length : 0,
    lastWeekPreviousMonth,
    weeks,
  }
}
