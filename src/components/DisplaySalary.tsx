import { Box, Text, VStack } from "@chakra-ui/react"

import { absences, hours, tauxHoraire } from "@/data/app"
import { useDateContext } from "@/components/DateContext"
import { buildDataWeeks } from "@/utils/data-month-builder"
import { computeWeekHours } from "@/utils/hours-rules"

const tauxHoraire25 = Number((tauxHoraire * 1.25).toFixed(2))
const tauxHoraire50 = Number((tauxHoraire * 1.5).toFixed(2))

export function DisplaySalary() {
  const { yearMonth } = useDateContext()
  const weeks = buildDataWeeks({ hours, absences })([yearMonth[0], yearMonth[1]])

  const { normalHours, extraHours25, extraHours50 } = weeks
    .map((week) => computeWeekHours(week.days, yearMonth))
    .reduce(
      (acc, curr) => ({
        totalHours: acc.totalHours + curr.totalHours,
        normalHours: acc.normalHours + curr.normalHours,
        extraHours25: acc.extraHours25 + curr.extraHours25,
        extraHours50: acc.extraHours50 + curr.extraHours50,
      }),
      { totalHours: 0, normalHours: 0, extraHours25: 0, extraHours50: 0 },
    )

  const normalHoursCost = Number((normalHours * tauxHoraire).toFixed(2))
  const extraHours25Cost = Number((extraHours25 * tauxHoraire25).toFixed(2))
  const extraHours50Cost = Number((extraHours50 * tauxHoraire50).toFixed(2))
  const totalCost = normalHoursCost + extraHours25Cost + extraHours50Cost

  return (
    <Box mt={4}>
      <VStack
        p="8"
        border="1px solid"
        borderColor="gray.300"
        width="fit-content"
        margin="auto"
        borderRadius="xl"
        shadow="xl"
      >
        <Text>Heures normales du mois : {normalHours}</Text>
        <Text>Heures supplémentaires à 25% du mois : {extraHours25}</Text>
        <Text>Heures supplémentaires à 50% du mois : {extraHours50}</Text>
        <Text>Taux horaire : {tauxHoraire}</Text>
        <Text>
          Coût heures normales : {normalHours} x {tauxHoraire} ={normalHoursCost}
        </Text>
        <Text>
          Coût heures sup 25% : {extraHours25} x {tauxHoraire25} ={extraHours25Cost}
        </Text>
        <Text>
          Coût heures sup 50% : {extraHours50} x {tauxHoraire50} ={extraHours50Cost}
        </Text>
        <Text>
          Total : {normalHoursCost} + {extraHours25Cost} + {extraHours50Cost} ={totalCost}
        </Text>
        <Text>
          Coût par famille : {totalCost} / 2 = {totalCost / 2}
        </Text>
      </VStack>
    </Box>
  )
}
