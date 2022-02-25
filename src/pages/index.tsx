import { Container } from "@chakra-ui/react"

import { MonthNavigation } from "@/components/MonthNavigation"
import { Calendar } from "@/components/Calendar"
import { DataToDeclare } from "@/components/DataToDeclare"
import { DateContextProvider } from "@/components/DateContext"

export default function IndexPage() {
  return (
    <Container maxW="container.xl">
      <DateContextProvider>
        <MonthNavigation />
        <Calendar />
        <DataToDeclare />
      </DateContextProvider>
    </Container>
  )
}
