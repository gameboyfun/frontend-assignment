'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function Home() {
  const router = useRouter()
  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className='flex flex-col justify-center h-screen gap-4'>
      <div className='flex justify-center gap-4'>
        <p>Assignment</p>
      </div>
      <div className='flex justify-center gap-4'>
        <Button onClick={() => handleClick('/assignment1')}>Assignment1</Button>
        <Button onClick={() => handleClick('/assignment2')}>Assignment2</Button>
      </div>
    </div>
  )
}
