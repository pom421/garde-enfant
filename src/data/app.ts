import type { REASONS_ABSENCE } from "@/config/index"

type AbsenceType = {
  start: string
  end: string
  reason: REASONS_ABSENCE
}

export const tauxHoraire = 8.24

export const absences: AbsenceType[] = [
  {
    start: "2022-01-01",
    end: "2022-01-05",
    reason: "VACATION",
  },
  {
    start: "2021-12-06",
    end: "2021-12-06",
    reason: "VACATION",
  },
  {
    start: "2021-07-12",
    end: "2021-07-16",
    reason: "RTT",
  },
  {
    start: "2021-07-03",
    end: "2021-07-05",
    reason: "UNPAID_VACATION",
  },
  {
    start: "2021-07-14",
    end: "2021-07-14",
    reason: "VACATION",
  },
  {
    start: "2021-07-12",
    end: "2021-07-13",
    reason: "VACATION",
  },
  {
    start: "2021-07-15",
    end: "2021-07-16",
    reason: "VACATION",
  },
  {
    start: "2022-01-03",
    end: "2022-01-04",
    reason: "VACATION",
  },
  {
    start: "2022-01-07",
    end: "2022-01-07",
    reason: "UNPAID_VACATION",
  },
  {
    start: "2022-01-18",
    end: "2022-01-19",
    reason: "RTT",
  },
]

type HourType = {
  date: string
  nbHours: number
}

export const hours: HourType[] = [
  {
    date: "2021-01-21",
    nbHours: 5,
  },
  {
    date: "2021-02-10",
    nbHours: 5,
  },
  {
    date: "2021-07-16",
    nbHours: 4,
  },
]
