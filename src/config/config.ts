import type { REASONS_ABSENCE } from "@/types/types"

export const CAPACITY_NORMAL_HOURS = 40
export const CAPACITY_EXTRA_HOURS_25 = 8

export const INFOS_ABSENCE: Record<REASONS_ABSENCE, { label: string; nbHours: number }> = {
  WE: { label: "WE", nbHours: 0 },
  VACATION: { label: "Congé payé", nbHours: 0 },
  UNPAID_VACATION: { label: "Congé sans solde", nbHours: 0 },
  PAID_VACATION: { label: "Congé payé exceptionnel", nbHours: 0 }, // ex: évènements familiaux, décès d'un proche, absence pour convenances personnelles des parents.
  PUBLIC_HOLIDAY: { label: "Jour férié", nbHours: 0 }, // (+10% pour les jours fériés et travaillés)
  SICKNESS: { label: "Arrêt maladie", nbHours: 0 }, // La salariée reçoit des indemnités de la CPAM.
  MATERNITY: { label: "Congé maternité", nbHours: 0 },
}

export const PAID_ABSENCES = ["VACATION", "PAID_VACATION", "PUBLIC_HOLIDAY"]
export const UNPAID_ABSENCES = ["UNPAID_VACATION", "SICKNESS", "MATERNITY"]

export function colorAbsence(reasonAbsence: REASONS_ABSENCE) {
  switch (reasonAbsence) {
    case "WE":
      return "gray.100"
    case "VACATION":
      return "teal.100"
    case "SICKNESS":
      return "orange.100"
    case "PUBLIC_HOLIDAY":
      return "blue.100"
    default:
      return "white"
  }
}
