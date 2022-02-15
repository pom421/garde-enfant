import React from "react"

const DateContext = React.createContext()

const frenchMonthNames = [
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

export function DateContextProvider({ children }) {
  const [currentMonth, setCurrentMonth] = React.useState(() => [new Date().getMonth(), new Date().getFullYear()])

  const currentMonthName = frenchMonthNames[currentMonth[0]]

  function addOneMonth() {
    setCurrentMonth((oldMonth) => [(oldMonth[0] + 1) % 12, oldMonth[0] === 11 ? oldMonth[1] + 1 : oldMonth[1]])
  }

  function removeOneMonth() {
    setCurrentMonth((oldMonth) => [
      oldMonth[0] === 0 ? 11 : oldMonth[0] - 1,
      oldMonth[0] === 0 ? oldMonth[1] - 1 : oldMonth[1],
    ])
  }

  return (
    <DateContext.Provider value={{ currentMonth, currentMonthName, addOneMonth, removeOneMonth }}>
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
