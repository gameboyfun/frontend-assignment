import { NextResponse } from 'next/server'
import { responseDTO } from '../../utils'
import axios from 'axios'

import type { UsersResponse } from './types'

export const dynamic = 'force-static'

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
