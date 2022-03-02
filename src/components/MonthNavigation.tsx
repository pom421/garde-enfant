import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"

import { useDateContext } from "@/components/DateContext"

export const MonthNavigation = () => {
  const { yearMonthName, yearMonth, addOneMonth, subOneMonth } = useDateContext()

  return (
    <Flex justifyContent="flex-end" mt="8" mb="12" mr="16">
      <IconButton variant="link" aria-label="Mois précédent" icon={<ArrowLeftIcon />} onClick={subOneMonth} />
      <Text minWidth={150} textAlign="center">
        {yearMonthName} {yearMonth[0]}
      </Text>
      <IconButton variant="link" aria-label="Mois suivant" icon={<ArrowRightIcon />} onClick={addOneMonth} />
    </Flex>
  )
}
