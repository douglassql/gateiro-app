import { useEffect, useState } from 'react'
import { MedicationRepository } from '@/database/repositories/MedicationRepository'
import { Medication } from '../models/Medication'

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([])

  function load() {
    const data = MedicationRepository.findAll()
    setMedications(data)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    medications,
    reload: load
  }
}
