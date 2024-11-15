'use client'
import { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import {
  getKeyValue,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import type { Header, TransformDepartment } from './types'

export default function Assignment2() {
  const header: Header[] = [
    { key: 'key', header: 'Department', allowsSorting: true },
    { key: 'male', header: 'Male', allowsSorting: true },
    { key: 'female', header: 'Female', allowsSorting: true },
    { key: 'ageRange', header: 'Age Range', allowsSorting: false }
  ]
  const [rawData, setRawData] = useState<TransformDepartment[]>([])
  const [department, setDepartment] = useState<TransformDepartment[]>([])
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'male',
    direction: 'ascending'
  })

  const sortedItems = useMemo(() => {
    type User = (typeof department)[0]
    return [...department].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number
      const second = b[sortDescriptor.column as keyof User] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, department])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users')
        if (data) {
          setRawData(data)
          const transformedData = Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object') {
              return {
                key,
                ...value
              }
            }
          })
          setDepartment(transformedData as TransformDepartment[])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='h-screen w-screen bg-white text-black flex flex-col p-8 gap-4'>
      <Table
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          table: 'min-h-[400px]'
        }}
      >
        <TableHeader>
          {header.map(({ key, header, allowsSorting }) => (
            <TableColumn key={key} allowsSorting={allowsSorting}>
              {header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={department.length === 0}
          loadingContent={<Spinner color='primary' label='Loading...' />}
        >
          {sortedItems.map((row) => (
            <TableRow key={row.key}>
              {(columnKey) => {
                return <TableCell>{getKeyValue(row, columnKey)}</TableCell>
              }}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <pre>{JSON.stringify(rawData, null, 3)}</pre>
      </div>
    </div>
  )
}
