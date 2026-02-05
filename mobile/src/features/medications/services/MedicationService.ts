import { MedicationRepository } from '@/database/repositories/MedicationRepository'
import { scheduleMedicationReminder } from './notificationService'
import { Medication } from '../models/Medication'

export async function createMedication(med: Medication) {
  MedicationRepository.create(med)

  await scheduleMedicationReminder(
    new Date(med.next_dose_date),
    med.name
  )
}
