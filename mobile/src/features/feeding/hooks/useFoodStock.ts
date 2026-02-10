import { useCallback, useEffect, useState } from 'react'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { FoodStock } from '@/database/models/FoodStock'

export function useFoodStock() {
  const [items, setItems] = useState<FoodStock[]>([])

  const load = useCallback(() => {
    const data = FoodStockRepository.findAll()
    setItems(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    items,
    reload: load
  }
}
