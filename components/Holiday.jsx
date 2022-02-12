import { Badge, Table, Tbody, TableCaption, Thead, Tr, Th, Td } from "@chakra-ui/react"

import data from "../data/app"
import { eachDayOfInterval, parseISO, getYear, isSameDay, isSaturday, isSunday } from "date-fns"
import moize from "moize"
import joursFeries from "@socialgouv/jours-feries"

const memoizedJoursFeries = (year) => Object.values(moize(joursFeries)(year))

function isHoliday(day) {
  // Est-ce que le jour fait partie des jours fériés de l'année ?
  return memoizedJoursFeries(getYear(day)).some((holidayDay) => isSameDay(day, holidayDay))
}

function computeDate({ start, end }) {
  const days = eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })

  const businessDays = days
    .filter((day) => !isSaturday(day))
    .filter((day) => !isSunday(day))
    .filter((day) => !isHoliday(day))

  return businessDays?.length
}

function reasonBadge(reason) {
  return <Badge colorScheme={reason === "CP" ? "green" : reason === "RTT" ? "purple" : "red"}>{reason}</Badge>
}

export default function Holiday() {
  return (
    <Table variant="simple" size="sm">
      <TableCaption></TableCaption>
      <Thead>
        <Tr>
          <Th>Date de début</Th>
          <Th>Date de fin</Th>
          <Th>Motif</Th>
          <Th isNumeric>Nb de jours</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.holidays.map((item, index) => (
          <Tr key={index}>
            <Td>{item.start}</Td>
            <Td>{item.end}</Td>
            <Td>{reasonBadge(item.reason)}</Td>
            <Td isNumeric>{computeDate(item)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
