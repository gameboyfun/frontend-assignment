'use client'
import useLogic from './logic'
import { Card } from '@nextui-org/react'

export default function Assignment1() {
  const { todoList, fruit, vegetable, handleClick, handleReturn } = useLogic()

  return (
    <div className='h-screen w-screen bg-white text-black flex p-8 gap-4'>
      <div className='w-1/3 gap-4 flex flex-col'>
        {todoList.map((item) => {
          return (
            <Card
              key={item.name}
              className='py-4 text-black p-4 hover:cursor-pointer'
              isPressable
              onPress={() => handleClick(item)}
            >
              {item.name}
            </Card>
          )
        })}
      </div>
      {['Fruit', 'Vegetable'].map((type) => (
        <div key={type} className='w-1/3 border rounded-lg'>
          <div className='text-center p-4 bg-gray-300 rounded-t-lg'>{type}</div>
          <div className='p-4 gap-4 flex flex-col'>
            {(type === 'Fruit' ? fruit : vegetable).map((item) => {
              return (
                <Card
                  key={`${type}-${item.name}`}
                  className='py-4 text-black p-4 hover:cursor-pointer'
                  isPressable
                  onPress={() => handleReturn(item)}
                >
                  {item.name}
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
