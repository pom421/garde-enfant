import React from "react"
import {
  format,
  getMonth,
  previousMonday,
  nextSunday,
  lastDayOfMonth,
  eachDayOfInterval,
  getDate,
  eachWeekOfInterval,
} from "date-fns"
import { useDateContext } from "./DateContext"
import { shortFrenchMonthNames } from "./DateContext"
import { Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"

const CAPACITY_NORMAL_HOURS = 40
const CAPACITY_EXTRA_HOURS = 8

const REASONS_ABSENCE = {
  WE: "WE",
  PUBLIC_HOLIDAY: "PUBLIC_HOLIDAY",
  SICKNESS: "SICKNESS",
  MATERNITY: "MATERNITY",
  OTHER: "OTHER",
}

function utilMonth({ year, month }) {
  const firstDayOfMonth = new Date(year, month, 1)
  const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
  const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
  const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

  const eachDayOfOfCurrentMonth = eachDayOfInterval({
    start: previousMondayBeforeMonth,
    end: nextSundayAfterMonth,
  })

  // const lastWeekPreviousMonth = eachDayOfInterval(previousMondayBeforeMonth, firstDayOfMonth).map((day) => ({
  //   date: day,
  //   nbHour: 0,
  //   reasonAbsence: "",
  // }))

  const weeks = eachWeekOfInterval({ start: firstDayOfMonth, end: lastDayOfCurrentMonth }, { weekStartsOn: 1 }).map(
    (monday) => {
      return eachDayOfInterval({ start: monday, end: nextSunday(monday) })
    },
  )

  // On construit les jours de la semaine précédente du mois précédent.
  const lastWeekPreviousMonth = []

  // On stocke ici les vrais jours du mois pour la semaine 1.
  const daysFromWeek1 = []

  for (const day of weeks[0]) {
    if (getMonth(day) === month) {
      daysFromWeek1.push(day)
    } else {
      lastWeekPreviousMonth.push(day)
    }
  }

  // On écrase avec les vraies valeurs de la semaine 1.
  weeks[0] = daysFromWeek1

  // On supprime les jours en trop de la dernière semaine.
  weeks[weeks.length - 1] = weeks[weeks.length - 1].filter((day) => getMonth(day) === month)

  return {
    firstDayOfMonth,
    previousMondayBeforeMonth,
    lastDayOfCurrentMonth,
    nextSundayAfterMonth,
    eachDayOfOfCurrentMonth,
    nbWeeks: weeks ? weeks.length : 0,
    lastWeekPreviousMonth,
    weeks,
  }
}

function buildDataMonth({ year, month }) {
  const dataMonth = {
    hours: {
      normalHours: 0,
      extraHours: 0,
      moreExtraHours: 0,
    },
    lastWeekPreviousMonth: {},
    weeks: [],
  }

  const { lastWeekPreviousMonth, weeks } = utilMonth({ year, month })

  dataMonth.lastWeekPreviousMonth = {
    days: lastWeekPreviousMonth.map((day) => ({
      date: day,
      nbHour: 0,
      reasonAbsence: "",
    })),
    hours: {
      capacityNormalHours: CAPACITY_NORMAL_HOURS,
      capacityExtraHours: CAPACITY_EXTRA_HOURS,
      totalHours: 0,
      normalHours: 0,
      extraHours: 0,
      moreExtraHours: 0,
    },
  }

  dataMonth.weeks = weeks.map((week) => ({
    days: week.map((day) => ({
      date: day,
      nbHours: 0,
      reasonAbsence: "",
    })),
    hours: {
      capacityNormalHours: CAPACITY_NORMAL_HOURS,
      capacityExtraHours: CAPACITY_EXTRA_HOURS,
      totalHours: 0,
      normalHours: 0,
      extraHours: 0,
      moreExtraHours: 0,
    },
  }))

  return dataMonth
}

console.log("dataMonth", buildDataMonth({ year: 2022, month: 1 }))

const dataMonth = {
  normalHours: 200,
  extraHours: 32,
  moreExtraHours: 10,
  lastWeekPreviousMonth: {
    days: [
      {
        date: "2022-01-31",
        reasonAbsence: "",
        nbHours: 10,
      },
    ],
    capacityNormalHours: 40,
    capacityExtraHours: 8,
    normalHours: 10,
    extraHours: 0,
    moreExtraHours: 0,
  },
  weeks: [
    {
      days: [
        {
          date: "2022-02-01",
          nbHours: 10,
        },
        {
          date: "2022-02-02",
          nbHours: 10,
        },
        {
          date: "2022-02-03",
          nbHours: 10,
        },
        {
          date: "2022-02-04",
          nbHours: 10,
        },
        {
          date: "2022-02-05",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
        {
          date: "2022-02-06",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
      ],
      capacityNormalHours: 30, // 40 - normalHours de la semaine équivalente du mois précédent
      capacityExtraHours: 8, // 8 - extraHours de la semaine équivalente du mois précédent
      totalHours: 40,
      normalHours: 30,
      extraHours: 8,
      moreExtraHours: 2,
    },
    {
      name: "S2",
      days: [
        {
          date: "2022-02-01",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-02",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-03",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-04",
          reasonAbsence: "",
          nbHours: 10,
        },
        {
          date: "2022-02-05",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
        {
          date: "2022-02-06",
          reasonAbsence: REASONS_ABSENCE.WE,
        },
      ],
      capacityNormalHours: 0, // 40 - normalHours de la semaine équivalente du mois précédent
      capacityExtraHours: 8, // 8 - extraHours de la semaine équivalente du mois précédent
      totalHours: 50,
      normalHours: 30,
      extraHours: 8,
      moreExtraHours: 2,
    },
  ],
}

function monthName(date) {
  return shortFrenchMonthNames[getMonth(date)]
}

function dateMonth(date) {
  return getDate(date) + "/" + getMonth(date)
}

export function Calendar() {
  const { currentMonth } = useDateContext()
  const colorNormalHours = useColorModeValue("gray.800", "gray.100")
  const colorExtraHours = useColorModeValue("yellow.800", "yellow.100")

  const firstDayOfMonth = new Date(currentMonth[1], currentMonth[0], 1)

  const previousMondayBeforeMonth = previousMonday(firstDayOfMonth)
  const lastDayOfCurrentMonth = lastDayOfMonth(firstDayOfMonth)
  const nextSundayAfterMonth = nextSunday(lastDayOfCurrentMonth)

  const eachDayOfIntervalOfCurrentMonth = eachDayOfInterval({
    start: previousMondayBeforeMonth,
    end: nextSundayAfterMonth,
  })

  const nbWeeks = eachDayOfIntervalOfCurrentMonth.length / 7

  return (
    <Grid templateColumns="700px calc(100%/8)" mb={20} justifyContent="center">
      <Grid templateColumns="repeat(7, 5rem)" gap={3}>
        <GridItem height="5rem">Lundi</GridItem>
        <GridItem height="5rem">Mardi</GridItem>
        <GridItem height="5rem">Mercredi</GridItem>
        <GridItem height="5rem">Jeudi</GridItem>
        <GridItem height="5rem">Vendredi</GridItem>
        <GridItem height="5rem">Samedi</GridItem>
        <GridItem height="5rem">Dimanche</GridItem>
        {eachDayOfIntervalOfCurrentMonth.map((day, index) => (
          <GridItem style={styleDay} key={dateMonth(day)} onClick={() => console.log(`click sur ${day}`)} height="5rem">
            {format(day, "dd") + " " + monthName(day)}
          </GridItem>
        ))}
      </Grid>
      <Grid gap={3}>
        {Array(nbWeeks)
          .fill("")
          .map((week, index) => (
            <GridItem key={index} height="5rem" align="center">
              <Text color={colorNormalHours}> 40 h normales</Text>
              <Text color={colorExtraHours}>10 h sup</Text>
            </GridItem>
          ))}
      </Grid>
    </Grid>
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
