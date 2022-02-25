import { Box, Button, Heading, Text } from "@chakra-ui/react"
import NextLink from "next/link"

export default function Home() {
  return (
    <Box as="section">
      <Box maxW="2xl" mx="auto" px={{ base: "6", lg: "8" }} py={{ base: "16", sm: "20" }} textAlign="center">
        <Heading size="3xl" fontWeight="extrabold" letterSpacing="tight">
          {"Paje express"}
        </Heading>
        <Text mt="4" fontSize="lg">
          {"Tous les outils pour les employeurs de garde d'enfants"}
        </Text>
        <NextLink href="/absences" passHref>
          <Button mt="8" as="a" href="#" size="lg" colorScheme="blue" fontWeight="bold">
            Commencer
          </Button>
        </NextLink>
      </Box>
    </Box>
  )
}
