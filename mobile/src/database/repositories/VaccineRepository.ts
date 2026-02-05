import { db } from '../connection/database'
import { Vaccine } from '../models/Vaccine'

export const VaccineRepository = {
  create(vac: Vaccine) {
    db.runSync(
      `INSERT INTO vaccines 
      (pet_id, name, date, next_date, notes)
      VALUES (?, ?, ?, ?, ?)`,
      [
        vac.pet_id,
        vac.name,
        vac.date ?? null,
        vac.next_date ?? null,
        vac.notes ?? null
      ]
    )
  },

  findAll(): Vaccine[] {
    return db.getAllSync('SELECT * FROM vaccines')
  }
}
