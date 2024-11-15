import { useRef, useState } from 'react'
import type { List, Type } from './types'

export default function useLogic() {
  const delay = 5000
  const [todoList, setTodoList] = useState<List[]>([
    {
      type: 'Fruit',
      name: 'Apple'
    },
    {
      type: 'Vegetable',
      name: 'Broccoli'
    },
    {
      type: 'Vegetable',
      name: 'Mushroom'
    },
    {
      type: 'Fruit',
      name: 'Banana'
    },
    {
      type: 'Vegetable',
      name: 'Tomato'
    },
    {
      type: 'Fruit',
      name: 'Orange'
    },
    {
      type: 'Fruit',
      name: 'Mango'
    },
    {
      type: 'Fruit',
      name: 'Pineapple'
    },
    {
      type: 'Vegetable',
      name: 'Cucumber'
    },
    {
      type: 'Fruit',
      name: 'Watermelon'
    },
    {
      type: 'Vegetable',
      name: 'Carrot'
    }
  ])
  const [fruit, setFruit] = useState<List[]>([])
  const [vegetable, setVegetable] = useState<List[]>([])
  const timeouts = useRef<{ [key: string]: NodeJS.Timeout }>({})

  const removeFromSorted = (type: Type, name: string) => {
    if (type === 'Fruit') {
      setFruit((prev) => prev.filter((item) => item.name !== name))
    } else {
      setVegetable((prev) => prev.filter((item) => item.name !== name))
    }
  }

  const handleClick = (item: List) => {
    const { type, name } = item

    setTodoList(todoList.filter((data) => data.name !== name))

    if (type === 'Fruit') {
      setFruit((prev) => [...prev, item])
    } else {
      setVegetable((prev) => [...prev, item])
    }

    // delay block
    timeouts.current[name] = setTimeout(() => {
      setTodoList((prev) => [...prev, item])
      removeFromSorted(type, name)

      delete timeouts.current[name]
    }, delay)
  }

  const handleReturn = (item: List) => {
    const { type, name } = item

    if (timeouts.current[name]) {
      clearTimeout(timeouts.current[name])
      delete timeouts.current[name]
    }

    setTodoList((prev) => [...prev, item])
    removeFromSorted(type, name)
  }

  return {
    todoList,
    fruit,
    vegetable,
    handleClick,
    handleReturn
  }
}
