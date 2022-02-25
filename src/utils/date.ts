export function assertDate(value) {
  if (typeof value === "object" && value instanceof Date) {
    return
  }
  throw new Error(`Error: a date is expected. Got ${JSON.stringify(value, null, 2)} which is a(n) ${typeof value}`)
}
