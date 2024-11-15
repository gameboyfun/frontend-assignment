import { GET } from './route'
import { mockData } from './mockdata'
import axios from 'axios'
import { NextResponse } from 'next/server'
import { Company } from './types'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockReturnValue({})
  }
}))
jest.mock('axios')

describe('test GET function', () => {
  it('case transform data no agerange correctly', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { users: mockData }
    })

    await GET()

    expect(NextResponse.json).toHaveBeenCalledWith({
      Engineering: {
        addressUser: { EmilyJohnson: '29112' },
        ageRange: '28',
        female: 1,
        hair: { Brown: 1 },
        male: 0
      },
      Support: {
        addressUser: { MichaelWilliams: '38807' },
        ageRange: '35',
        female: 0,
        hair: { Green: 1 },
        male: 1
      }
    })
  })

  it('case transform data with age range correctly', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        users: [
          ...mockData.slice(0),
          {
            ...mockData[1],
            company: {
              ...mockData[1].company,
              department: 'Engineering'
            }
          }
        ]
      }
    })

    await GET()

    expect(NextResponse.json).toHaveBeenCalledWith({
      Engineering: {
        addressUser: {
          EmilyJohnson: '29112',
          MichaelWilliams: '38807'
        },
        ageRange: '28-35',
        female: 1,
        hair: {
          Brown: 1,
          Green: 1
        },
        male: 1
      },
      Support: {
        addressUser: {
          MichaelWilliams: '38807'
        },
        ageRange: '35',
        female: 0,
        hair: {
          Green: 1
        },
        male: 1
      }
    })
  })

  it('case throw error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Error fetching users data'))

    await GET()

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Error fetching users data' },
      { status: 500 }
    )
  })
})
