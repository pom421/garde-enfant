import { Badge, Table, Tbody, TableCaption, Thead, Tr, Th, Td } from "@chakra-ui/react"
import { eachDayOfInterval, isAfter, parseISO, getYear, isSameDay, isSaturday, isSunday } from "date-fns"
import { isPublicHoliday } from "@/utils/public-holidays"

import { absences } from "../data/app"

/*
 * Enrichit les données avec des données calculées.
 */
function absencesBuilder(data) {
  const absences = data.absences
    .sort((day1, day2) => (day1.start === day2.start ? 0 : day1.start > day2.start ? 1 : -1))
    .map((day) => ({ ...day, days: computeDays(day) }))
  const putCP = absences.filter((day) => day.reason === "CP").reduce((acc, day) => acc + day.days, 0)
  const leftCP = 25 - putCP
  const putRTT = absences.filter((day) => day.reason === "RTT").reduce((acc, day) => acc + day.days, 0)
  const leftRTT = 10 - putRTT

  return {
    ...data,
    absences,
    putCP,
    leftCP,
    putRTT,
    leftRTT,
  }
}

function computeDays({ start, end }) {
  const days = eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })

  const businessDays = days
    .filter((day) => !isSaturday(day))
    .filter((day) => !isSunday(day))
    .filter((day) => !isPublicHoliday(day))

  return businessDays?.length
}

function reasonBadge(reason) {
  return <Badge colorScheme={reason === "CP" ? "green" : reason === "RTT" ? "purple" : "red"}>{reason}</Badge>
}

const allData = absencesBuilder(absences)

export default function Holiday() {
  return (
    <>
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
          {allData.absences.map((item, index) => (
            <Tr key={index}>
              <Td>{item.start}</Td>
              <Td>{item.end}</Td>
              <Td textAlign={"center"}>{reasonBadge(item.reason)}</Td>
              <Td isNumeric>{item.days}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Table variant="simple" size="sm">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th colSpan="3" textAlign={"center"} bgColor="tomato" color="white">
              CP
            </Th>
            <Th colSpan="3" textAlign={"center"} bgColor="lightblue" color="white">
              RTT
            </Th>
          </Tr>
          <Tr>
            <Th bgColor="tomato" color="white" isNumeric>
              théoriques
            </Th>
            <Th bgColor="tomato" color="white" isNumeric>
              posés
            </Th>
            <Th bgColor="tomato" color="white" isNumeric>
              restants
            </Th>
            <Th bgColor="lightblue" color="white" isNumeric>
              théoriques
            </Th>
            <Th bgColor="lightblue" color="white" isNumeric>
              posés
            </Th>
            <Th bgColor="lightblue" color="white" isNumeric>
              restants
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td isNumeric>25</Td>
            <Td isNumeric>{allData.putCP}</Td>
            <Td isNumeric>{allData.leftCP}</Td>
            <Td isNumeric>10</Td>
            <Td isNumeric>{allData.putRTT}</Td>
            <Td isNumeric>{allData.leftRTT}</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}
