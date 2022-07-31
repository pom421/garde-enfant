import type { REASONS_ABSENCE } from "@/config/config"

export type AbsenceType = {
  start: string
  end: string
  reason: REASONS_ABSENCE
}

export const tauxHoraire = 8.44

export const absences: AbsenceType[] = [
  {
    start: "2022-02-07",
    end: "2022-02-11",
    reason: "SICKNESS",
  },
  {
    start: "2022-03-04",
    end: "2022-03-04",
    reason: "VACATION",
  },
]

export type HourType = {
  date: string
  nbHours: number
}

// Heures explicites effectuées par la garde d'enfant.
export const hours: HourType[] = []
