export interface Medication {
  id?: number
  pet_id: number
  name: string
  dosage?: string
  start_date: string
  next_dose_date: string
  interval_hours?: number
}
