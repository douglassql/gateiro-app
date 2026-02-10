import { db } from '../connection/database'
import { Consultation } from '../models/Consultation'

export const ConsultationRepository = {
  create(item: Consultation) {
    db.runSync(
      `INSERT INTO consultations (pet_id, title, date, notes)
       VALUES (?, ?, ?, ?)`,
      [
        item.pet_id,
        item.title,
        item.date,
        item.notes ?? null
      ]
    )
  },

  findAll(): Consultation[] {
    return db.getAllSync('SELECT * FROM consultations')
  },

  findById(id: number): Consultation | null {
    const rows = db.getAllSync('SELECT * FROM consultations WHERE id = ?', [id]) as Consultation[]
    return (rows[0] ?? null) as Consultation | null
  },

  update(item: Consultation) {
    if (!item.id) throw new Error('id e obrigatorio para atualizar consulta')
    db.runSync(
      `UPDATE consultations
       SET pet_id = ?, title = ?, date = ?, notes = ?
       WHERE id = ?`,
      [
        item.pet_id,
        item.title,
        item.date,
        item.notes ?? null,
        item.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM consultations WHERE id = ?', [id])
  }
}
