import React from "react"
import { Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import { format, getMonth, getDate } from "date-fns"

import { useDateContext } from "@/components/DateContext"
import { shortFrenchMonthNames } from "@/components/DateContext"
import { utilMonth } from "@/utils/month"
import { buildDataMonth } from "@/utils/data-month-builder"
import { absences, hours } from "data/app"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

function dateMonth(date) {
  return getDate(date) + "/" + getMonth(date)
}

export function Calendar() {
  const colorNormalHours = useColorModeValue("gray.800", "gray.100")
  const colorExtraHours = useColorModeValue("yellow.800", "yellow.100")
  const { currentMonth } = useDateContext()

  const { eachDayOfOfCurrentMonth, weeks } = utilMonth({
    year: currentMonth[1],
    month: currentMonth[0],
  })

  const dataMonth = buildDataMonth({ hours, absences })({
    year: currentMonth[1],
    month: currentMonth[0],
  })

  return (
    <Grid templateColumns="700px calc(100%/8)" mb={20} justifyContent="center">
      <Grid templateColumns="repeat(7, 5rem)" gap={3}>
        <GridItem height="5rem">Lundi</GridItem>
        <GridItem height="5rem">Mardi</GridItem>
        <GridItem height="5rem">Mercredi</GridItem>
        <GridItem height="5rem">Jeudi</GridItem>
        <GridItem height="5rem">Vendredi</GridItem>
        <GridItem height="5rem">Samedi</GridItem>
        <GridItem height="5rem">Dimanche</GridItem>
        {eachDayOfOfCurrentMonth.map((day, index) => (
          <GridItem style={styleDay} key={dateMonth(day)} onClick={() => console.log(`click sur ${day}`)} height="5rem">
            {format(day, "dd") + " " + monthName(day)}
          </GridItem>
        ))}
      </Grid>
      <Grid gap={3}>
        {Array(weeks.length)
          .fill("")
          .map((_, index) => (
            <GridItem key={index} height="5rem" align="center">
              <Text color={colorNormalHours}> 40 h normales</Text>
              <Text color={colorExtraHours}>10 h sup</Text>
            </GridItem>
          ))}
      </Grid>
    </Grid>
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
