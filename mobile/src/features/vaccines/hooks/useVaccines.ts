import { useCallback, useEffect, useState } from 'react'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { Vaccine } from '@/database/models/Vaccine'

export function useVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])

  const load = useCallback(() => {
    const data = VaccineRepository.findAll()
    setVaccines(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    vaccines,
    reload: load
  }
}
