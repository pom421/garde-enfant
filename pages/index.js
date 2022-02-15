import { ReactNode } from "react"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Container,
  useColorMode,
  TableContainer,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

import Layout from "@/components/Layout"
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
