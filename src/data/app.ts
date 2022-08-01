import type { AbsenceType } from "@/types/types"

export const tauxHoraire = 8.51

export const hoursRegularDay = 10

export const contractStartDate = "2021-05-01"

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
    start: "2022-05-02",
    end: "2022-05-06",
    reason: "VACATION",
  },
  {
    start: "2022-05-20",
    end: "2022-05-20",
    reason: "VACATION",
  },
  {
    start: "2022-05-27",
    end: "2022-05-27",
    reason: "VACATION",
  },
  {
    start: "2022-08-08",
    end: "2022-08-26",
    reason: "VACATION",
  },
  { start: "2022-12-21", end: "2022-12-27", reason: "VACATION" },
]
