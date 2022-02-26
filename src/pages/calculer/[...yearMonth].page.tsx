import { Button, Container, Flex } from "@chakra-ui/react"

import { DateContextProvider } from "@/components/DateContext"
import { useRouter } from "next/router"

export default function CalculerPage() {
  const router = useRouter()

  return (
    <Container maxW="container.xl">
      <DateContextProvider></DateContextProvider>
    </Container>
  )
}
