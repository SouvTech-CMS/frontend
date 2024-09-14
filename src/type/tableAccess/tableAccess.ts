export type TableWithAccessList = {
  table_name: string
  columns: string[]
}

export type RoleTableAccess = {
  role_id: number
  tables: TableWithAccessList[]
}
