import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from "@chakra-ui/react"

import { useDateContext } from "@/components/DateContext"
import { absences, tauxHoraire } from "@/data/app"
import { buildDataWeeks } from "@/utils/data-month-builder"
import { computeWeekHours } from "@/utils/hours-rules"

const tauxHoraire25 = Number((tauxHoraire * 1.25).toFixed(2))
const tauxHoraire50 = Number((tauxHoraire * 1.5).toFixed(2))

export function DisplaySalary() {
  const { yearMonth } = useDateContext()
  const weeks = buildDataWeeks({ absences })([yearMonth[0], yearMonth[1]])

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

  const netSalaryBase = Number(((tauxHoraire * 40 * 52) / 12).toFixed(2))
  const extraHours25Cost = Number((extraHours25 * tauxHoraire25).toFixed(2))
  const extraHours50Cost = Number((extraHours50 * tauxHoraire50).toFixed(2))
  const totalCost = Number((netSalaryBase + extraHours25Cost + extraHours50Cost).toFixed(2))
  const totalCostPerFamily = Number((Number(totalCost) / 2).toFixed(2))

  return (
    <Tabs defaultIndex={2} mt="8">
      <TabList>
        <Tab>Taux horaires et salaire</Tab>
        <Tab>Heures du mois</Tab>
        <Tab>Montant du mois</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid templateColumns="300px 1fr" gap={6}>
            <GridItem w="100%" textAlign="right">
              <Text>Taux horaire : </Text>
              <Text>Salaire mensuel de base : </Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>{tauxHoraire}</Text>
              <Text>
                {netSalaryBase}{" "}
                <Tooltip label={`${tauxHoraire} €/h x 40 h x 52 semaines / 12 mois`}>
                  <QuestionOutlineIcon w="3" h="3" />
                </Tooltip>
              </Text>
            </GridItem>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="300px 1fr" gap={6}>
            <GridItem w="100%" textAlign="right">
              <Text>Heures normales du mois : </Text>
              <Text>Heures supplémentaires à 25% du mois : </Text>
              <Text>Heures supplémentaires à 50% du mois :</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>{normalHours}</Text>
              <Text>{extraHours25}</Text>
              <Text>{extraHours50}</Text>
            </GridItem>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="300px 1fr" gap={6}>
            <GridItem w="100%" textAlign="right">
              <Text>Salaire mensuel net : </Text>
              <Text>Coût heures sup 25% : </Text>
              <Text>Coût heures sup 50% :</Text>
              <Text>Total :</Text>
              <Text>Coût par famille :</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>{netSalaryBase}</Text>
              <Text>
                {extraHours25Cost}{" "}
                <Tooltip label={`${extraHours25} x ${tauxHoraire25}`}>
                  <QuestionOutlineIcon w="3" h="3" />
                </Tooltip>
              </Text>
              <Text>
                {extraHours50Cost}{" "}
                <Tooltip label={`${extraHours50} x ${tauxHoraire50}`}>
                  <QuestionOutlineIcon w="3" h="3" />
                </Tooltip>
              </Text>
              <Text>
                {totalCost}{" "}
                <Tooltip label={`${netSalaryBase} + ${extraHours25Cost} + ${extraHours50Cost}`}>
                  <QuestionOutlineIcon w="3" h="3" />
                </Tooltip>
              </Text>
              <Text>
                {totalCostPerFamily}{" "}
                <Tooltip label={`${totalCost} / 2`}>
                  <QuestionOutlineIcon w="3" h="3" />
                </Tooltip>
              </Text>
            </GridItem>
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
