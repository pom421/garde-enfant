export type REASONS_ABSENCE =
  | "WE"
  | "VACATION"
  | "SICKNESS"
  | "UNPAID_VACATION"
  | "PAID_VACATION"
  | "PUBLIC_HOLIDAY"
  | "MATERNITY"

export type AbsenceType = {
  start: string
  end: string
  reason: REASONS_ABSENCE
}

export type HoursType = {
  totalHours: number
  normalHours: number
  extraHours25: number
  extraHours50: number
}
