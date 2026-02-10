import { useCallback, useEffect, useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { Pet } from '@/database/models/Pet'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])

  const load = useCallback(() => {
    const data = PetRepository.findAll()
    setPets(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    pets,
    reload: load
  }
}
