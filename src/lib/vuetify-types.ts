export interface DataTableHeader {
    text: string
    value: string
    align?: 'start' | 'center' | 'end'
    sortable?: boolean
    filterable?: boolean
    groupable?: boolean
    divider?: boolean
    class?: string | string[]
    cellClass?: string | string[]
    width?: string | number
  };
  