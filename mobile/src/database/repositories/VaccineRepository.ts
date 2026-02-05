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
  },

  findById(id: number): Vaccine | null {
    const rows = db.getAllSync('SELECT * FROM vaccines WHERE id = ?', [id]) as Vaccine[]
    return (rows[0] ?? null) as Vaccine | null
  },

  update(vac: Vaccine) {
    if (!vac.id) throw new Error('id é obrigatório para atualizar vacina')
    db.runSync(
      `UPDATE vaccines
       SET pet_id = ?, name = ?, date = ?, next_date = ?, notes = ?
       WHERE id = ?`,
      [
        vac.pet_id,
        vac.name,
        vac.date ?? null,
        vac.next_date ?? null,
        vac.notes ?? null,
        vac.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM vaccines WHERE id = ?', [id])
  }
}
