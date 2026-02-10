import { useEffect, useState } from 'react'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import { Consultation } from '@/database/models/Consultation'

export function useConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([])

  function load() {
    const data = ConsultationRepository.findAll()
    setConsultations(data)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    consultations,
    reload: load
  }
}
