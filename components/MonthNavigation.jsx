import { Button, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { useDateContext } from "./DateContext"
import { IconButton } from "@chakra-ui/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"

export const MonthNavigation = () => {
  const { currentMonthName, currentMonth, addOneMonth, removeOneMonth } = useDateContext()

  return (
    <Flex justifyContent="flex-end" mt="8">
      <IconButton
        variant="link"
        aria-label="Mois précédent"
        icon={<ArrowLeftIcon />}
        onClick={() => removeOneMonth()}
      />
      <Text minWidth={150} textAlign="center">
        {currentMonthName} {currentMonth[1]}
      </Text>
      <IconButton variant="link" aria-label="Mois suivant" icon={<ArrowRightIcon />} onClick={() => addOneMonth()} />
    </Flex>
  )
}
