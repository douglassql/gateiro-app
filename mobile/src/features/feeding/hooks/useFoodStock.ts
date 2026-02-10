import { useEffect, useState } from 'react'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { FoodStock } from '@/database/models/FoodStock'

export function useFoodStock() {
  const [items, setItems] = useState<FoodStock[]>([])

  function load() {
    const data = FoodStockRepository.findAll()
    setItems(data)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    items,
    reload: load
  }
}
