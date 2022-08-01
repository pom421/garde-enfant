import { buildDataWeeks } from "./data-month-builder"
import { formatFrDate } from "./date"
import { computeWeekHours } from "./hours-rules"

test("Only regular hours", () => {
  const yearMonth = [2022, 1] as const // february 2022

  const weeks = buildDataWeeks()(yearMonth)
  const res = computeWeekHours(weeks[0].days, yearMonth)

  expect(
    weeks[0].days.map((day) => ({
      date: formatFrDate(day.date),
      nbHours: day.nbHours,
      ...(day.reasonAbsence && { reasonAbsence: day.reasonAbsence }),
    })),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "date": "2022-01-31",
        "nbHours": 10,
      },
      Object {
        "date": "2022-02-01",
        "nbHours": 10,
      },
      Object {
        "date": "2022-02-02",
        "nbHours": 10,
      },
      Object {
        "date": "2022-02-03",
        "nbHours": 10,
      },
      Object {
        "date": "2022-02-04",
        "nbHours": 10,
      },
      Object {
        "date": "2022-02-05",
        "nbHours": 0,
        "reasonAbsence": "WE",
      },
      Object {
        "date": "2022-02-06",
        "nbHours": 0,
        "reasonAbsence": "WE",
      },
    ]
  `)

  expect(res).toMatchInlineSnapshot(`
    Object {
      "extraHours25": 8,
      "extraHours50": 2,
      "normalHours": 30,
      "totalHours": 40,
    }
  `)
})

test("Bug #3 with first week of october 2022", () => {
  const yearMonth = [2022, 9] as const // october 2022

  const weeks = buildDataWeeks()(yearMonth)
  const res = computeWeekHours(weeks[0].days, yearMonth)

  expect(res).toMatchInlineSnapshot(`
    Object {
      "extraHours25": 0,
      "extraHours50": 0,
      "normalHours": 0,
      "totalHours": 0,
    }
  `)
})
