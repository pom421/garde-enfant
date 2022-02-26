import { previousMonday, nextSunday, lastDayOfMonth, eachDayOfInterval, eachWeekOfInterval } from "date-fns"
import { YearMonthType } from "./date"

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

export function utilMonth(yearMonth: YearMonthType): UtilMonthReturnType {
  const firstDay = new Date(yearMonth[0], yearMonth[1], 1)
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
