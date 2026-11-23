import { Badge, Box, Button, Flex, Grid, Switch, Text } from "@chakra-ui/react"
import { getAllPermissions } from "api/role/permission"
import { LoadingPage } from "component/page/LoadingPage"
import { PermissionGroupSection } from "constant/permissionGroups"
import { FC, Fragment, useState } from "react"
import { useQuery } from "react-query"
import { Permission } from "type/role/permission"
import { WithId } from "type/withId"
import { getPermissionSections } from "util/permissionGroups"

const ACTIONS = [
  { key: "view", label: "View" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
] as const

const getRowItems = (row: PermissionGroupSection["rows"][number]) => [
  ...ACTIONS.filter(({ key }) => row[key]).map(({ key, label }) => ({
    name: row[key]!,
    label,
  })),
  ...(row.extra ?? []),
]

interface PermissionsGridProps {
  checkedPermissionsIds: number[]
  isInvalid: boolean
  handlePermissionsUpdate: (permissionId: number) => void
}

export const PermissionsGrid: FC<PermissionsGridProps> = (props) => {
  const { checkedPermissionsIds, isInvalid, handlePermissionsUpdate } = props

  const { data: permissionsList, isLoading } = useQuery<WithId<Permission>[]>(
    "permissionsList",
    getAllPermissions,
  )

  const [selectedTitle, setSelectedTitle] = useState<string>()

  if (isLoading || !permissionsList) {
    return <LoadingPage />
  }

  const permissionsIdsByName = new Map(
    permissionsList.map(({ id, name }) => [name, id]),
  )
  const sections = getPermissionSections(permissionsList)
  const selectedSection =
    sections.find(({ title }) => title === selectedTitle) ?? sections[0]

  const countChecked = (section: PermissionGroupSection) =>
    section.rows
      .flatMap(getRowItems)
      .filter(({ name }) =>
        checkedPermissionsIds.includes(permissionsIdsByName.get(name) ?? -1),
      ).length

  const renderToggle = (name?: string, label?: string) => {
    const id = name ? permissionsIdsByName.get(name) : undefined
    if (id === undefined) {
      return null
    }

    return (
      <Flex alignItems="center" gap={2}>
        <Switch
          size="sm"
          isChecked={checkedPermissionsIds.includes(id)}
          onChange={() => handlePermissionsUpdate(id)}
        />
        <Text fontSize="sm" color="gray" whiteSpace="nowrap">
          {label}
        </Text>
      </Flex>
    )
  }

  return (
    <Flex gap={4} minH={300}>
      <Flex direction="column" gap={1} w="max-content" flexShrink={0}>
        {sections.map((section) => {
          const checkedCount = countChecked(section)
          const isSelected = section.title === selectedSection?.title

          return (
            <Button
              key={section.title}
              justifyContent="space-between"
              variant={isSelected ? "solid" : "ghost"}
              colorScheme={isSelected ? "blue" : "gray"}
              size="sm"
              onClick={() => setSelectedTitle(section.title)}
            >
              {section.title}
              <Badge
                ml={3}
                minW={6}
                h={6}
                px={1.5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                borderRadius="full"
                colorScheme={isSelected ? "whiteAlpha" : "blue"}
                visibility={checkedCount > 0 ? "visible" : "hidden"}
              >
                {checkedCount}
              </Badge>
            </Button>
          )
        })}
      </Flex>

      {/* NOTE: all sections are stacked in one cell and only the selected one is
      visible, so the modal keeps the width of the widest section */}
      <Grid alignSelf="flex-start">
        {sections.map((section) => (
          <Grid
            key={section.title}
            gridArea="1 / 1"
            alignSelf="start"
            visibility={
              section.title === selectedSection?.title ? "visible" : "hidden"
            }
            templateColumns="minmax(max-content, 1fr) repeat(3, max-content) auto"
            alignItems="center"
            borderWidth={1}
            borderColor={isInvalid ? "red.300" : "thinBorder"}
            borderRadius={12}
          >
            {section.rows.map((row, index) => {
              const cellProps = {
                h: "full",
                py: 3,
                display: "flex",
                alignItems: "center",
                borderTopWidth: index ? 1 : 0,
                borderColor: "thinBorder",
              }

              const hasActions = ACTIONS.some(({ key }) => row[key])
              const extraToggles = (
                <Flex gap={4}>
                  {row.extra?.map(({ name, label }) => (
                    <Fragment key={name}>{renderToggle(name, label)}</Fragment>
                  ))}
                </Flex>
              )

              return (
                <Fragment key={row.title}>
                  <Box {...cellProps} pl={4} pr={6}>
                    <Text fontWeight="medium" whiteSpace="nowrap">
                      {row.title}
                    </Text>
                  </Box>

                  {hasActions ? (
                    <>
                      {ACTIONS.map(({ key, label }) => (
                        <Box key={key} {...cellProps} pr={4}>
                          {renderToggle(row[key], label)}
                        </Box>
                      ))}

                      <Box {...cellProps} pr={4}>
                        {extraToggles}
                      </Box>
                    </>
                  ) : (
                    // NOTE: rows with extra permissions only use the action columns
                    <Box {...cellProps} gridColumn="2 / -1" pr={4}>
                      {extraToggles}
                    </Box>
                  )}
                </Fragment>
              )
            })}
          </Grid>
        ))}
      </Grid>
    </Flex>
  )
}
