import React from "react"
import { Container } from "@chakra-ui/react"

import { MonthNavigation } from "@/components/MonthNavigation"
import { Calendar } from "@/components/Calendar"
import { DateContextProvider } from "@/components/DateContext"
import { DisplaySalary } from "@/components/DisplaySalary"

// function ButtonToCompute() {
//   const router = useRouter()
//   const { yearMonth } = useDateContext()

//   React.useEffect(() => {
//     console.log("yearMonth", yearMonth)
//   }, [])

//   return (
//     <Flex justify="end" mt={4}>
//       <Button onClick={() => router.push(`/calculer/${yearMonth[0]}/${yearMonth[1]}`)}>Calculer le salaire</Button>
//     </Flex>
//   )
// }

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
