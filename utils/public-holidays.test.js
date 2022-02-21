import { parseISO } from "date-fns"
import { isPublicHoliday } from "./public-holidays"

test("should see 14 juillet as a public holiday", () => {
  expect(isPublicHoliday(parseISO("2022-07-14"))).toBe(true)
})

test("should see 15 juillet not as a public holiday", () => {
  expect(isPublicHoliday(parseISO("2022-07-15"))).toBe(false)
})
