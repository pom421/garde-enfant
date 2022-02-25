import React from "react"
import { Box, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import { format, getMonth } from "date-fns"

import { useDateContext } from "@/components/DateContext"
import { shortFrenchMonthNames } from "@/components/DateContext"
import { buildDataMonth, getHoursInWeek } from "@/utils/data-month-builder"
import { absences, hours } from "@/data/app"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

export function Calendar() {
  const { currentMonth } = useDateContext()

  let weeks = buildDataMonth({ hours, absences })({
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
          const hours = getHoursInWeek(week.days)

          return (
            <Tr key={index}>
              {week.days.map((day, index) => (
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
