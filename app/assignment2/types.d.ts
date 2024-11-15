import type { Result } from '../api/users/types'

export interface TransformDepartment extends Result {
  key: string
}

export type Header = {
  key: string
  header: string
  allowsSorting: boolean
}
