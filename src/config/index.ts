export const CAPACITY_NORMAL_HOURS = 40
export const CAPACITY_EXTRA_HOURS_25 = 8

export const NB_HOURS_FOR_VACATION = 8
export const HOURS_REGULAR_DAY = 10

export type REASONS_ABSENCE =
  | "WE"
  | "VACATION"
  | "UNPAID_VACATION"
  | "RTT"
  | "PUBLIC_HOLIDAY"
  | "SICKNESS"
  | "MATERNITY"
  | "OTHER"

export const LABEL_ABSENCE: Record<REASONS_ABSENCE, string> = {
  WE: "WE",
  VACATION: "Congé payé",
  UNPAID_VACATION: "Congé sans solde",
  RTT: "RTT",
  PUBLIC_HOLIDAY: "Jour férié",
  SICKNESS: "Arrêt maladie",
  MATERNITY: "Congé maternité",
  OTHER: "Autre",
}

export function colorAbsence(reasonAbsence: REASONS_ABSENCE) {
  switch (reasonAbsence) {
    case "WE":
      return "gray.100"
    case "VACATION":
      return "teal.100"
    case "SICKNESS":
      return "orange.100"
    default:
      return "white"
  }
}
