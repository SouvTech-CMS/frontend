import {
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { ClientTypeAnalyticsModal } from "component/client/analytics/ClientTypeAnalyticsModal"
import { ClientTypeConditionsList } from "component/client/analytics/ClientTypeConditionsList"
import { CLIENTS_TYPES_INFO, ClientType } from "constant/clients"
import { FC, useState } from "react"
import { FiChevronDown, FiChevronRight } from "react-icons/fi"

interface ClientTypeCardProps {
  type: ClientType
}

export const ClientTypeCard: FC<ClientTypeCardProps> = (props) => {
  const { type } = props

  const { name, description } = CLIENTS_TYPES_INFO[type]

  const [isConditionsVisible, setIsConditionsVisible] = useState<boolean>(false)

  const icon = isConditionsVisible ? FiChevronDown : FiChevronRight

  const handleClick = () => {
    setIsConditionsVisible((prevIsVisible) => !prevIsVisible)
  }

  const {
    isOpen: isAnalyticsModalOpen,
    onOpen: onAnalyticsModalOpen,
    onClose: onAnalyticsModalClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        bgColor="white"
        w="full"
        direction="column"
        alignItems="center"
        pl={4}
        pr={2}
        pt={2}
        pb={3}
        borderRadius={10}
      >
        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {/* Name */}
          <Flex w="full" direction="column">
            <Heading size="md">{name} Clients</Heading>
          </Flex>

          {/* Modal Btn */}
          <Flex direction="column">
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={onAnalyticsModalOpen}
            >
              View
            </Button>
          </Flex>
        </Flex>

        <Flex w="full" direction="column" gap={1}>
          {/* Description */}
          <Flex w="full">
            <Text>{description}</Text>
          </Flex>

          {/* Conditions Btn */}
          <Flex w="full" direction="column">
            <Flex
              w="fit-content"
              direction="row"
              alignItems="center"
              onClick={handleClick}
              cursor="pointer"
            >
              <Icon as={icon} />

              <Text _hover={{ textDecoration: "underline" }}>Conditions</Text>
            </Flex>

            {/* Conditions List */}
            {isConditionsVisible && (
              <ClientTypeConditionsList type={type} pl={2} />
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Modals */}
      <>
        <ClientTypeAnalyticsModal
          type={type}
          isOpen={isAnalyticsModalOpen}
          onClose={onAnalyticsModalClose}
        />
      </>
    </>
  )
}
