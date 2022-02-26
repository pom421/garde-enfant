import { Button, Container, Flex } from "@chakra-ui/react"

import { MonthNavigation } from "@/components/MonthNavigation"
import { Calendar } from "@/components/Calendar"
import { DateContextProvider, useDateContext } from "@/components/DateContext"
import { useRouter } from "next/router"
import { DisplaySalary } from "@/components/DisplaySalary"

function ButtonToCompute() {
  const router = useRouter()
  const { yearMonth } = useDateContext()

  return (
    <Flex justify="end" mt={4}>
      <Button onClick={() => router.push(`/calculer/${yearMonth[0]}/${yearMonth[1]}`)}>Calculer le salaire</Button>
    </Flex>
  )
}

export default function IndexPage() {
  return (
    <Container maxW="container.xl">
      <DateContextProvider>
        <MonthNavigation />
        <Calendar />
        {/* <ButtonToCompute /> */}
        <DisplaySalary />
      </DateContextProvider>
    </Container>
  )
}
