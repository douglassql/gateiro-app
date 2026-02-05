import { useEffect, useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { Pet } from '@/database/models/Pet'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])

  function load() {
    const data = PetRepository.findAll()
    setPets(data)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    pets,
    reload: load
  }
}
