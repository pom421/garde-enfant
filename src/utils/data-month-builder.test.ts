import { HOURS_REGULAR_DAY, REASONS_ABSENCE } from "@/config/index"
import { parseISO } from "date-fns"
import { buildDataMonth, fillDay } from "./data-month-builder"

test("should find a sunday", () => {
  const { reasonAbsence, nbHours } = fillDay({})(parseISO("2022-01-30")) // dimanche

  expect(nbHours).toBe(undefined)
  expect(reasonAbsence).toBe(REASONS_ABSENCE.WE)
})

test("should find a vacation", () => {
  const absences = [
    {
      start: "2022-01-30",
      end: "2022-02-01",
      reason: REASONS_ABSENCE.VACATION,
    },
  ]

  const { reasonAbsence, nbHours } = fillDay({ absences })(parseISO("2022-01-31"))

  expect(nbHours).toBe(undefined)
  expect(reasonAbsence).toBe(REASONS_ABSENCE.VACATION)
})

test("should find a publicHoliday", () => {
  const { reasonAbsence, nbHours } = fillDay({})(parseISO("2022-07-14")) // jours férié

  expect(nbHours).toBe(undefined)
  expect(reasonAbsence).toBe(REASONS_ABSENCE.PUBLIC_HOLIDAY)
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
      reason: REASONS_ABSENCE.VACATION,
    },
  ]

  const dataMonth = buildDataMonth({ hours, absences })({ year: 2022, month: 1 })

  expect(dataMonth).toMatchSnapshot()
})
