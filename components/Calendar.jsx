import React from "react"
import { format, getMonth, previousMonday, nextSunday, lastDayOfMonth, eachDayOfInterval, getDate } from "date-fns"
import { useDateContext } from "./DateContext"
import { shortFrenchMonthNames } from "./DateContext"
import { Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

function dateMonth(date) {
  return getDate(date) + "/" + getMonth(date)
}

export function Calendar() {
  const { currentMonth } = useDateContext()
  const colorNormalHours = useColorModeValue("gray.800", "gray.100")
  const colorExtraHours = useColorModeValue("yellow.800", "yellow.100")

  const firstDayOfMonth = new Date(currentMonth[1], currentMonth[0], 1)

  const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
  const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
  const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

  const eachDayOfIntervalOfCurrentMonth = eachDayOfInterval({
    start: previousMondayBeforeMonth,
    end: nextSundayAfterMonth,
  })

  const nbWeeks = eachDayOfIntervalOfCurrentMonth.length / 7

  return (
    <Grid templateColumns="700px calc(100%/8)" mb={20}>
      <Grid templateColumns="repeat(7, 5rem)" gap={3}>
        {eachDayOfIntervalOfCurrentMonth.map((day, index) => (
          <GridItem style={styleDay} key={dateMonth} onClick={() => console.log(`click sur ${day}`)} height="5rem">
            {format(day, "dd") + " " + monthName(day)}
          </GridItem>
        ))}
      </Grid>
      <Grid gap={3}>
        {Array(nbWeeks)
          .fill("")
          .map((week, index) => (
            <GridItem key={index} height="5rem">
              <Text color={colorNormalHours}>40 h normales</Text>
              <Text color={colorExtraHours}>10 h sup</Text>
            </GridItem>
          ))}
      </Grid>
    </Grid>
  )
}
