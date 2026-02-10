import { useCallback, useEffect, useState } from 'react'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import { Consultation } from '@/database/models/Consultation'

export function useConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const load = useCallback(() => {
    const data = ConsultationRepository.findAll()
    setConsultations(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    consultations,
    reload: load
  }
}
