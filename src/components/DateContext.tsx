import { addOneMonth, subOneMonth, YearMonthType } from "@/utils/date"
import React from "react"

const defaultValue = {
  yearMonth: [new Date().getMonth(), new Date().getFullYear()] as const,
  yearMonthName: "",
  addOneMonth: () => {},
  subOneMonth: () => {},
}

const DateContext = React.createContext(defaultValue)

export const frenchMonthNames = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]

export const shortFrenchMonthNames = [
  "jan",
  "fév",
  "mar",
  "avr",
  "mai",
  "jui",
  "jui",
  "aoû",
  "sep",
  "oct",
  "nov",
  "déc",
]

export function DateContextProvider({ children }) {
  const [yearMonth, setYearMonth] = React.useState<YearMonthType>(() => [
    new Date().getFullYear(),
    new Date().getMonth(),
  ])

  return (
    <DateContext.Provider
      value={{
        yearMonth,
        yearMonthName: frenchMonthNames[yearMonth[1]],
        addOneMonth: () => setYearMonth(addOneMonth),
        subOneMonth: () => setYearMonth(subOneMonth),
      }}
    >
      {children}
    </DateContext.Provider>
  )
}

export function useDateContext() {
  const context = React.useContext(DateContext)
  if (context === undefined) {
    throw new Error("useDateContext must be used within a DateContextProvider")
  }
  return context
}
