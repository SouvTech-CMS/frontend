import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { getClientTypeAnalytics } from "api/analytics/clients"
import { ClientCard } from "component/client/analytics/ClientCard"
import { ClientTypeConditionsList } from "component/client/analytics/ClientTypeConditionsList"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { LoadingPage } from "component/page/LoadingPage"
import { CLIENTS_TYPES_INFO, ClientType } from "constant/clients"
import { FC } from "react"
import { useQuery } from "react-query"
import { ClientWithOrders } from "type/client/client"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"

interface ClientTypeAnalyticsModalProps extends ModalProps {
  type: ClientType
}

export const ClientTypeAnalyticsModal: FC<ClientTypeAnalyticsModalProps> = (
  props,
) => {
  const { type, isOpen, onClose } = props

  const { name, description } = CLIENTS_TYPES_INFO[type]

  const { data: clientsList, isLoading } = useQuery<WithId<ClientWithOrders>[]>(
    ["clientsTypeAnalytics", type],
    () =>
      getClientTypeAnalytics({
        client_type: type,
      }),
  )

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader pb={1}>{name} Clients Analytics</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* Client Type Info */}
            <Flex w="full" direction="column" gap={3}>
              <Divider />

              <Flex w="full" direction="column" gap={2}>
                {/* Description */}
                <Flex w="full" direction="column" gap={1}>
                  <Text>{description}</Text>
                </Flex>

                {/* Conditions */}
                <Flex w="full" direction="column" gap={1}>
                  <Text>Conditions:</Text>

                  <ClientTypeConditionsList type={type} pl={2} />
                </Flex>
              </Flex>

              <Divider />
            </Flex>

            {/* Clients List */}
            <Flex w="full" direction="column" gap={3}>
              {isLoading && <LoadingPage />}

              {clientsList?.map((client, index) => (
                <ClientCard key={index} clientWithOrders={client} />
              ))}
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex
            w="full"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          ></Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
