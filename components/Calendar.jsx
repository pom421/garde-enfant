import React from "react"
import { Box, Grid, GridItem, Table, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react"
import { format, getMonth, getDate } from "date-fns"

import { useDateContext } from "@/components/DateContext"
import { shortFrenchMonthNames } from "@/components/DateContext"
import { utilMonth } from "@/utils/month"
import { buildDataMonth, computeHours } from "@/utils/data-month-builder"
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

  let dataMonth = buildDataMonth({ hours, absences })({
    year: currentMonth[1],
    month: currentMonth[0],
  })

  computeHours(dataMonth)

  console.log(JSON.stringify(dataMonth, null, 2))

  return (
    // <Grid templateColumns="700px calc(100%/8)" mb={20} justifyContent="center">
    //   <Grid templateColumns="repeat(7, 5rem)" gap={3}>
    //     <GridItem height="5rem">Lundi</GridItem>
    //     <GridItem height="5rem">Mardi</GridItem>
    //     <GridItem height="5rem">Mercredi</GridItem>
    //     <GridItem height="5rem">Jeudi</GridItem>
    //     <GridItem height="5rem">Vendredi</GridItem>
    //     <GridItem height="5rem">Samedi</GridItem>
    //     <GridItem height="5rem">Dimanche</GridItem>
    //     {eachDayOfOfCurrentMonth.map((day, index) => (
    //       <GridItem style={styleDay} key={dateMonth(day)} onClick={() => console.log(`click sur ${day}`)} height="5rem">
    //         {format(day, "dd") + " " + monthName(day)}
    //       </GridItem>
    //     ))}
    //   </Grid>
    //   <Grid gap={3}>
    //     {Array(weeks.length)
    //       .fill("")
    //       .map((_, index) => (
    //         <GridItem key={index} height="5rem" align="center">
    //           <Text color={colorNormalHours}> 40 h normales</Text>
    //           <Text color={colorExtraHours}>10 h sup</Text>
    //         </GridItem>
    //       ))}
    //   </Grid>
    // </Grid>

    <Table>
      <Tr>
        <Td>Lundi</Td>
        <Td>Mardi</Td>
        <Td>Mercredi</Td>
        <Td>Jeudi</Td>
        <Td>Vendredi</Td>
        <Td>Samedi</Td>
        <Td>Dimanche</Td>
        <Td>Résultat</Td>
      </Tr>
      {
        <Tr>
          {dataMonth.lastWeekPreviousMonth.days.map((day, index) => (
            <Td key={index}>
              <Box>
                <Text>{format(day.date, "dd") + " " + monthName(day.date)}</Text>
                <Text>{day.nbHours ? `${day.nbHours} heures` : ""}</Text>
                <Text>{day.reasonAbsence}</Text>
              </Box>
            </Td>
          ))}
          {dataMonth.weeks[0].days.map((day, index) => (
            <Td key={index}>
              <Box>
                <Text>{format(day.date, "dd") + " " + monthName(day.date)}</Text>
                <Text>{day.nbHours ? `${day.nbHours} heures` : ""}</Text>
                <Text>{day.reasonAbsence}</Text>
              </Box>
            </Td>
          ))}
          <Td>
            <Box>
              <Text>{dataMonth.weeks[0].hours.totalHours} h</Text>
              <Text>{dataMonth.weeks[0].hours.normalHours} h normales</Text>
              <Text>{dataMonth.weeks[0].hours.extraHours} h sup 25%</Text>
              <Text>{dataMonth.weeks[0].hours.moreExtraHours} h sup 50%</Text>
            </Box>
          </Td>
        </Tr>
      }
      {dataMonth.weeks.slice(1).map((week, index) => (
        <Tr key={index}>
          {week.days.map((day, index) => (
            // <Td key={index}>{format(day, "dd") + " " + monthName(day)}</Td>
            <Td key={index}>
              <Box>
                <Text>{format(day.date, "dd") + " " + monthName(day.date)}</Text>
                <Text>{day.nbHours ? `${day.nbHours} heures` : ""}</Text>
                <Text>{day.reasonAbsence}</Text>
              </Box>
            </Td>
          ))}
          <Td>
            <Box>
              <Text>{week.hours.totalHours} h</Text>
              <Text>{week.hours.normalHours} h normales</Text>
              <Text>{week.hours.extraHours} h sup 25%</Text>
              <Text>{week.hours.moreExtraHours} h sup 50%</Text>
            </Box>
          </Td>
        </Tr>
      ))}
    </Table>
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
