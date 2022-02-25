// Reason : CP (congé payé), RTT, CSS (congé sans solde), AM (arrêt maladie)

import { REASONS_ABSENCE } from "@/config/index"

export const absences = [
  {
    start: "2022-01-30",
    end: "2022-02-01",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2021-12-06",
    end: "2021-12-06",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2021-07-12",
    end: "2021-07-16",
    reason: REASONS_ABSENCE.RTT,
  },
  {
    start: "2021-07-03",
    end: "2021-07-05",
    reason: REASONS_ABSENCE.UNPAID_VACATION,
  },
  {
    start: "2021-07-14",
    end: "2021-07-14",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2021-07-12",
    end: "2021-07-13",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2021-07-15",
    end: "2021-07-16",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2022-01-03",
    end: "2022-01-04",
    reason: REASONS_ABSENCE.VACATION,
  },
  {
    start: "2022-01-07",
    end: "2022-01-07",
    reason: REASONS_ABSENCE.UNPAID_VACATION,
  },
  {
    start: "2022-01-18",
    end: "2022-01-19",
    reason: REASONS_ABSENCE.RTT,
  },
]

export const hours = [
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
