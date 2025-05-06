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
import { Container } from "component/Container"
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
      <Container p={4} gap={2}>
        {/* Name */}
        <Heading size="md">{name} Clients</Heading>

        <Flex w="full" direction="column" gap={1}>
          {/* Description */}
          <Text>{description}</Text>

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

        {/* Modal Btn */}
        <Button
          w="full"
          variant="ghost"
          colorScheme="blue"
          onClick={onAnalyticsModalOpen}
        >
          View
        </Button>
      </Container>

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
