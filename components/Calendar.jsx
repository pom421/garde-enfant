import React from "react"
import { format, getMonth, previousMonday, nextSunday, lastDayOfMonth, eachDayOfInterval } from "date-fns"
import { useDateContext } from "./DateContext"
import { shortFrenchMonthNames } from "./DateContext"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

export function Calendar() {
  const { currentMonth } = useDateContext()

  const firstDayOfMonth = new Date(currentMonth[1], currentMonth[0], 1)

  const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
  const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
  const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

  const eachDayOfIntervalOfCurrentMonth = eachDayOfInterval({
    start: previousMondayBeforeMonth,
    end: nextSundayAfterMonth,
  })

  return (
    <div style={styleWrapper}>
      {eachDayOfIntervalOfCurrentMonth.map((day, index) => (
        <div style={styleDay} key={index} onClick={() => console.log(`click sur ${day}`)}>
          {format(day, "dd") + " " + monthName(day)}
        </div>
      ))}
    </div>
  )
}

const styleWrapper = {
  border: "3px solid",
  borderRadius: 4,
  display: "grid",
  gridTemplateColumns: "repeat(7, 5rem)",
  padding: 16,
  gap: 4,
  width: "min-content",
  marginBottom: 20,
}

const styleDay = {
  border: "2px solid",
  borderRadius: 4,
  height: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
