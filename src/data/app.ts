import type { AbsenceType } from "@/types/types"

export const tauxHoraire = 8.51

export const hoursRegularDay = 10

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
  {
    start: "2022-10-06",
    end: "2022-10-06",
    reason: "VACATION",
  },
  {
    start: "2022-08-08",
    end: "2022-08-26",
    reason: "VACATION",
  },
]
