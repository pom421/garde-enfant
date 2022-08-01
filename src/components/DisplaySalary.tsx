import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from "@chakra-ui/react"
import { FunctionComponent } from "react"

import { useDateContext } from "@/components/DateContext"
import { absences, contractStartDate, tauxHoraire } from "@/data/app"
import { buildDataWeeks } from "@/utils/data-month-builder"
import { computeWeekHours } from "@/utils/hours-rules"
import { formatFrDate } from "@/utils/date"

const tauxHoraire25 = Number((tauxHoraire * 1.25).toFixed(2))
const tauxHoraire50 = Number((tauxHoraire * 1.5).toFixed(2))

/**
 * Utility to separate the number part and the decimal part, in order to display it in UI with alignment.
 *
 * @param decimalNumber
 * @returns a tuple with the number part and the decimal part
 */
function separateDecimal(decimalNumber: number): [number, string] {
  const int = Math.floor(decimalNumber)
  const dec = Math.round((decimalNumber - int) * 100)
  return [int, String(dec).padStart(2, "0")]
}

type NumericData = {
  label: string
  value: number
  tooltip?: string
}

type StringData = {
  label: string
  value: string
  tooltip?: string
}

const isStringData = (element: StringData | NumericData): element is StringData => {
  if (typeof element.value === "string") return true
  return false
}

type Props = {
  dataList: Array<NumericData | StringData>
  gridOptions?: any
}

const DataGrid: FunctionComponent<Props> = ({
  dataList,
  gridOptions = { templateColumns: "300px 100px 50px", gap: 0 },
}) => {
  return (
    <Grid {...gridOptions}>
      <GridItem w="100%" textAlign="right">
        {dataList.map((element) => (
          <Text key={element.label}>{element.label}</Text>
        ))}
      </GridItem>
      <GridItem w="100%" h="10" textAlign="right">
        {dataList.map((element) => (
          <Text key={element.label}>{isStringData(element) ? element.value : separateDecimal(element.value)[0]}</Text>
        ))}
      </GridItem>
      <GridItem w="100%" h="10">
        {dataList.map((element) => (
          <Text key={element.label}>
            {isStringData(element) ? "" : "." + separateDecimal(element.value)[1]}{" "}
            {element.tooltip && (
              <Tooltip label={element.tooltip}>
                <QuestionOutlineIcon w="3" h="3" />
              </Tooltip>
            )}
          </Text>
        ))}
      </GridItem>
    </Grid>
  )
}

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
        <Tab>Informations générales</Tab>
        <Tab>Taux horaires et salaire</Tab>
        <Tab>Heures du mois</Tab>
        <Tab>Montant du mois</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <DataGrid
            dataList={[
              {
                label: "Début contrat :",
                value: formatFrDate(contractStartDate),
              },
            ]}
          />
        </TabPanel>
        <TabPanel>
          <DataGrid
            dataList={[
              {
                label: "Taux horaire :",
                value: tauxHoraire,
              },
              {
                label: "Salaire mensuel de base :",
                value: netSalaryBase,
                tooltip: `${tauxHoraire} €/h x 40 h x 52 semaines / 12 mois`,
              },
            ]}
          />
        </TabPanel>
        <TabPanel>
          <DataGrid
            dataList={[
              {
                label: "Heures normales du mois :",
                value: normalHours,
              },
              {
                label: "Heures supplémentaires à 25% du mois :",
                value: extraHours25,
              },
              {
                label: "Heures supplémentaires à 50% du mois :",
                value: extraHours50,
              },
            ]}
          />
        </TabPanel>
        <TabPanel>
          <DataGrid
            dataList={[
              {
                label: "Salaire mensuel net :",
                value: netSalaryBase,
              },
              {
                label: "Coût heures sup 25% :",
                value: extraHours25Cost,
                tooltip: `${extraHours25} x ${tauxHoraire25}`,
              },
              {
                label: "Coût heures sup 50% :",
                value: extraHours50Cost,
                tooltip: `${extraHours50} x ${tauxHoraire50}`,
              },
              {
                label: "Total :",
                value: totalCost,
                tooltip: `${netSalaryBase} + ${extraHours25Cost} + ${extraHours50Cost}`,
              },
              {
                label: "Coût par famille :",
                value: totalCostPerFamily,
                tooltip: `${totalCost} / 2`,
              },
            ]}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
