import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"
import { ClientRow } from "component/client/ClientRow"
import { CustomTh } from "component/customTable/CustomTh"
import { CLIENTS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { FullClient } from "type/client/client"
import { WithId } from "type/withId"

interface ClientsTableProps {
  clientsList: WithId<FullClient>[]
  resetCurrentPage?: () => void
}

export const ClientsTable: FC<ClientsTableProps> = (props) => {
  const { clientsList, resetCurrentPage } = props

  return (
    <TableContainer w="full">
      <Table w="full" variant="striped">
        <Thead>
          <Tr>
            {CLIENTS_TABLE_COLUMNS.map((column, index) => (
              <CustomTh
                key={index}
                column={column}
                resetCurrentPage={resetCurrentPage}
              />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {clientsList?.map((client, index) => (
            <ClientRow key={index} client={client} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
