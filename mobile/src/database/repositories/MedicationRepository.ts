import { db } from '../connection/database'
import { Medication } from '../../features/medications/models/Medication'

export const MedicationRepository = {
  create(med: Medication) {
    db.runSync(
      `INSERT INTO medications 
      (pet_id, name, dosage, start_date, next_dose_date, interval_hours)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        med.pet_id,
        med.name,
        med.dosage,
        med.start_date,
        med.next_dose_date,
        med.interval_hours
      ]
    )
  },

  findAll(): Medication[] {
    return db.getAllSync('SELECT * FROM medications')
  }
}
