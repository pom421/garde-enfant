import { buildDataWeeks } from "./data-month-builder";
import { computeWeekHours } from "./hours-rules";

test("Only regular hours", () => {
  const yearMonth = [2022, 1] as const; // février 2022

  const weeks = buildDataWeeks()(yearMonth);
  const res = computeWeekHours(weeks[0].days, yearMonth);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "capacityExtraHours": 4,
      "capacityNormalHours": 0,
      "extraHours25": 4,
      "extraHours50": 0,
      "normalHours": 36,
      "totalHours": 50,
      "totalHoursInWeekSameMonth": 0,
    }
  `);
});

test("Update hour for a day", () => {
  const hours = [
    {
      date: "2022-02-02",
      nbHours: 5,
    },
  ];

  const yearMonth = [2022, 1] as const;

  const weeks = buildDataWeeks({ hours })(yearMonth);
  const res = computeWeekHours(weeks[0].days, yearMonth);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "capacityExtraHours": 8,
      "capacityNormalHours": 1,
      "extraHours25": 0,
      "extraHours50": 0,
      "normalHours": 35,
      "totalHours": 45,
      "totalHoursInWeekSameMonth": 0,
    }
  `);
});
