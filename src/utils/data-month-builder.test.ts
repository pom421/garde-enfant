import { parseISO } from "date-fns"

import type { AbsenceType } from "@/types/types"

import { hoursRegularDay } from "@/data/app"
import { buildDataWeeks, fillDayBuilder } from "./data-month-builder"

test("should find a sunday", () => {
  const { reasonAbsence, nbHours } = fillDayBuilder({})(parseISO("2022-01-30")) // dimanche

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("WE")
})

test("should find a vacation", () => {
  const absences: AbsenceType[] = [
    {
      start: "2022-01-30",
      end: "2022-02-01",
      reason: "VACATION",
    },
  ]

  const { reasonAbsence, nbHours } = fillDayBuilder({ absences })(parseISO("2022-01-31"))

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("VACATION")
})

test("should find a publicHoliday", () => {
  const { reasonAbsence, nbHours } = fillDayBuilder({})(parseISO("2022-07-14")) // jours férié

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("PUBLIC_HOLIDAY")
})

test("should find a regulard day with defaut hours", () => {
  const { reasonAbsence, nbHours } = fillDayBuilder({})(parseISO("2022-07-15"))

  expect(nbHours).toBe(hoursRegularDay)
  expect(reasonAbsence).toBe(undefined)
})

// build data month tests ---------------------------- //

test("should match snapshot", () => {
  const absences = [
    {
      start: "2022-01-30",
      end: "2022-02-05",
      reason: "VACATION",
    },
  ]

  const weeks = buildDataWeeks({ absences })([2022, 1])

  expect(weeks).toMatchSnapshot()
})
