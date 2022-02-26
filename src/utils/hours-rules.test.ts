import { buildDataWeeks } from "./data-month-builder"
import { computeWeekHours } from "./hours-rules"

test("Only normal hours", () => {
  const yearMonth = [2022, 1] as const

  const weeks = buildDataWeeks()(yearMonth)
  const res = computeWeekHours(weeks[0].days, yearMonth)

  expect(res).toMatchInlineSnapshot(`
    Object {
      "capacityExtraHours": 8,
      "capacityNormalHours": 0,
      "extraHours25": 0,
      "extraHours50": 0,
      "normalHours": 40,
      "totalHours": 40,
      "totalHoursOnlyMonth": 0,
    }
  `)
})

test("Update hour for a day", () => {
  const hours = [
    {
      date: "2022-02-02",
      nbHours: 5,
    },
  ]

  const yearMonth = [2022, 1] as const

  const weeks = buildDataWeeks({ hours })(yearMonth)
  const res = computeWeekHours(weeks[0].days, yearMonth)

  expect(res).toMatchInlineSnapshot(`
    Object {
      "capacityExtraHours": 8,
      "capacityNormalHours": 5,
      "extraHours25": 0,
      "extraHours50": 0,
      "normalHours": 35,
      "totalHours": 35,
      "totalHoursOnlyMonth": 0,
    }
  `)
})
