import { addOneMonth, inYearMonth } from "./date"

test("add one month for january is february", () => {
  const res = addOneMonth([2020, 1])

  expect(res[0]).toBe(2020)
  expect(res[1]).toBe(2)
})

test("add one month for december is january next year", () => {
  const res = addOneMonth([2020, 11])

  expect(res[0]).toBe(2021)
  expect(res[1]).toBe(0)
})

test("inYearMonth ok", () => {
  expect(inYearMonth(new Date(2020, 1, 5), [2020, 1])).toBe(true)
})

test("inYearMonth ko", () => {
  expect(inYearMonth(new Date(2020, 3, 5), [2020, 1])).toBe(false)
})
