import { NextResponse } from 'next/server'
import axios from 'axios'
import { groupBy } from 'lodash'

import type { AddressUser, HairColorCount, ResponseDTO, User, UsersResponse } from './types'

export const dynamic = 'force-static'

const responseDTO = (users: User[]): ResponseDTO => {
  const groupedByDepartment = groupBy(users, 'company.department')

  const response: ResponseDTO = {}

  Object.keys(groupedByDepartment).forEach((department) => {
    const departmentUsers = groupedByDepartment[department]

    const { maleCount, femaleCount, minAge, maxAge, hairColorCount, addressUser } =
      departmentUsers.reduce(
        (acc, { gender, age, hair, firstName, lastName, address }) => {
          acc.maleCount += gender === 'male' ? 1 : 0
          acc.femaleCount += gender === 'female' ? 1 : 0

          acc.minAge = Math.min(acc.minAge, age)
          acc.maxAge = Math.max(acc.maxAge, age)

          if (hair.color) {
            acc.hairColorCount[hair.color] = (acc.hairColorCount[hair.color] || 0) + 1
          }

          const fullName = `${firstName}${lastName}`
          acc.addressUser[fullName] = address.postalCode

          return acc
        },
        {
          maleCount: 0,
          femaleCount: 0,
          minAge: Infinity,
          maxAge: -Infinity,
          hairColorCount: {} as HairColorCount,
          addressUser: {} as AddressUser
        }
      )

    const ageRange = minAge === maxAge ? `${minAge}` : `${minAge}-${maxAge}`

    response[department] = {
      male: maleCount,
      female: femaleCount,
      ageRange,
      hair: hairColorCount,
      addressUser: addressUser
    }
  })

  return response
}

export async function GET() {
  try {
    const response = await axios.get<UsersResponse>('https://dummyjson.com/users')
    const user = response.data.users
    const transformData = responseDTO(user)
    return NextResponse.json(transformData)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users data' }, { status: 500 })
  }
}
