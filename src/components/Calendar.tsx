import React from "react"
import { Box, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import { format, getMonth } from "date-fns"

import { useDateContext } from "@/components/DateContext"
import { shortFrenchMonthNames } from "@/components/DateContext"
import { buildDataWeeks } from "@/utils/data-month-builder"
import { absences, hours } from "@/data/app"
import { computeWeekHours } from "@/utils/hours-rules"

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

export function Calendar() {
  const { yearMonth } = useDateContext()

  let weeks = buildDataWeeks({ hours, absences })([yearMonth[1], yearMonth[0]])

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
          const hours = computeWeekHours(week.days, yearMonth)

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
