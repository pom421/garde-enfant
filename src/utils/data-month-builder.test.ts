import { HOURS_REGULAR_DAY } from "@/config/index"
import type { REASONS_ABSENCE } from "@/config/index"

import { parseISO } from "date-fns"
import { buildDataWeeks, fillDay } from "./data-month-builder"

test("should find a sunday", () => {
  const { reasonAbsence, nbHours } = fillDay({})(parseISO("2022-01-30")) // dimanche

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("WE")
})

test("should find a vacation", () => {
  const absences = [
    {
      start: "2022-01-30",
      end: "2022-02-01",
      reason: "VACATION",
    },
  ]

  const { reasonAbsence, nbHours } = fillDay({ absences })(parseISO("2022-01-31"))

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("VACATION")
})

test("should find a publicHoliday", () => {
  const { reasonAbsence, nbHours } = fillDay({})(parseISO("2022-07-14")) // jours férié

  expect(nbHours).toBe(0)
  expect(reasonAbsence).toBe("PUBLIC_HOLIDAY")
})

test("should find a regulard day with defaut hours", () => {
  const { reasonAbsence, nbHours } = fillDay({})(parseISO("2022-07-15"))

  expect(nbHours).toBe(HOURS_REGULAR_DAY)
  expect(reasonAbsence).toBe(undefined)
})

// build data month tests ---------------------------- //

test("should match snapshot", () => {
  const hours = [
    {
      date: "2022-01-31",
      nbHours: 5,
    },
    {
      date: "2022-02-10",
      nbHours: 7,
    },
  ]
  const absences = [
    {
      start: "2022-01-30",
      end: "2022-02-05",
      reason: "VACATION",
    },
  ]

  const weeks = buildDataWeeks({ hours, absences })([2022, 1])

  expect(weeks).toMatchSnapshot()
})
