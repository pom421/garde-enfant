import { Badge, Table, Tbody, TableCaption, Thead, Tr, Th, Td } from "@chakra-ui/react"
import { eachDayOfInterval, parseISO, getYear, isSameDay, isSaturday, isSunday } from "date-fns"
import moize from "moize"
import joursFeries from "@socialgouv/jours-feries"

import data from "../data/app"

/*
 * Enrichit les données avec des données calculées.
 */
function enhanceData(data) {
  const holidays = data.holidays.map((day) => ({ ...day, days: computeDays(day) }))
  const putCP = holidays.filter((day) => day.reason === "CP").reduce((acc, day) => acc + day.days, 0)
  const leftCP = 25 - putCP
  const putRTT = holidays.filter((day) => day.reason === "RTT").reduce((acc, day) => acc + day.days, 0)
  const leftRTT = 10 - putRTT

  return {
    ...data,
    holidays,
    putCP,
    leftCP,
    putRTT,
    leftRTT,
  }
}

const memoizedJoursFeries = (year) => Object.values(moize(joursFeries)(year))

function isHoliday(day) {
  // Est-ce que le jour fait partie des jours fériés de l'année ?
  return memoizedJoursFeries(getYear(day)).some((holidayDay) => isSameDay(day, holidayDay))
}

function computeDays({ start, end }) {
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

const allData = enhanceData(data)

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
          {allData.holidays.map((item, index) => (
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
            <Th colspan="3" textAlign={"center"} bgColor="tomato" color="white">
              CP
            </Th>
            <Th colspan="3" textAlign={"center"} bgColor="lightblue" color="white">
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
