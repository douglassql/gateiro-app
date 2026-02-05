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
        med.dosage ?? null,
        med.start_date,
        med.next_dose_date,
        med.interval_hours ?? null
      ]
    )
  },

  findAll(): Medication[] {
    return db.getAllSync('SELECT * FROM medications')
  },

  findById(id: number): Medication | null {
    const rows = db.getAllSync('SELECT * FROM medications WHERE id = ?', [id]) as Medication[]
    return (rows[0] ?? null) as Medication | null
  },

  update(med: Medication) {
    if (!med.id) throw new Error('id é obrigatório para atualizar medicamento')
    db.runSync(
      `UPDATE medications
       SET pet_id = ?, name = ?, dosage = ?, start_date = ?, next_dose_date = ?, interval_hours = ?
       WHERE id = ?`,
      [
        med.pet_id,
        med.name,
        med.dosage ?? null,
        med.start_date,
        med.next_dose_date,
        med.interval_hours ?? null,
        med.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM medications WHERE id = ?', [id])
  }
}
