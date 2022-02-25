import React from "react"
import { Box, Table, Tbody, Td, Text, Thead, Tr, useColorModeValue } from "@chakra-ui/react"
import { format, getMonth } from "date-fns"

import { useDateContext } from "@/components/DateContext"
import { shortFrenchMonthNames } from "@/components/DateContext"
import { buildDataMonth, getHoursInWeek } from "@/utils/data-month-builder"
import { absences, hours } from "@/data/app"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

export function Calendar() {
  const colorNormalHours = useColorModeValue("gray.800", "gray.100")
  const colorExtraHours = useColorModeValue("yellow.800", "yellow.100")
  const { currentMonth } = useDateContext()

  let { weeks } = buildDataMonth({ hours, absences })({
    year: currentMonth[1],
    month: currentMonth[0],
  })

  return (
    <Table>
      <Thead>
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
      </Thead>
      <Tbody>
        {weeks.map((week, index) => {
          const hours = getHoursInWeek(week)

          return (
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
                  <Text>{hours?.totalHours} h</Text>
                  <Text>{hours?.normalHours} h normales</Text>
                  <Text>{hours?.extraHours25} h sup 25%</Text>
                  <Text>{hours?.extraHours50} h sup 50%</Text>
                </Box>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
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
