import {
  PERMISSION_GROUPS,
  PermissionGroupRow,
  PermissionGroupSection,
} from "constant/permissionGroups"
import { Permission } from "type/role/permission"

const ACTIONS = [
  { key: "view", label: "View" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
] as const

const getRowPermissionsNames = (row: PermissionGroupRow) => [
  ...ACTIONS.map(({ key }) => row[key]),
  ...(row.extra?.map(({ name }) => name) ?? []),
]

/**
 * Sections for the given permissions: known ones are grouped, unknown ones go
 * to "Other", rows without any of the permissions are dropped.
 */
export const getPermissionSections = (
  permissions: Permission[],
): PermissionGroupSection[] => {
  const names = new Set(permissions.map(({ name }) => name))
  const groupedNames = new Set(
    PERMISSION_GROUPS.flatMap(({ rows }) =>
      rows.flatMap(getRowPermissionsNames),
    ),
  )

  const sections = PERMISSION_GROUPS.map((section) => ({
    ...section,
    rows: section.rows.filter((row) =>
      getRowPermissionsNames(row).some((name) => name && names.has(name)),
    ),
  }))

  const otherRows: PermissionGroupRow[] = permissions
    .filter(({ name }) => !groupedNames.has(name))
    .map(({ name, description }) => ({
      title: description,
      extra: [{ name, label: "Allow" }],
    }))
  sections.push({ title: "Other", rows: otherRows })

  return sections.filter(({ rows }) => rows.length > 0)
}

/**
 * Short labels of the role permissions in a row: "View", "Edit", "Create"…
 */
export const getRowPermissionsLabels = (
  row: PermissionGroupRow,
  names: Set<string>,
) => [
  ...ACTIONS.filter(({ key }) => row[key] && names.has(row[key]!)).map(
    ({ label }) => label,
  ),
  ...(row.extra
    ?.filter(({ name }) => names.has(name))
    .map(({ label }) => label) ?? []),
]
