import { db } from '../connection/database'
import { Reminder } from '../models/Reminder'

export const ReminderRepository = {
  create(r: Reminder) {
    db.runSync(
      `INSERT INTO reminders (pet_id, type, title, datetime, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        r.pet_id,
        r.type,
        r.title ?? null,
        r.datetime,
        r.status ?? null
      ]
    )
  },

  findAll(): Reminder[] {
    return db.getAllSync('SELECT * FROM reminders')
  },

  findById(id: number): Reminder | null {
    const rows = db.getAllSync('SELECT * FROM reminders WHERE id = ?', [id]) as Reminder[]
    return (rows[0] ?? null) as Reminder | null
  },

  update(r: Reminder) {
    if (!r.id) throw new Error('id é obrigatório para atualizar lembrete')
    db.runSync(
      `UPDATE reminders
       SET pet_id = ?, type = ?, title = ?, datetime = ?, status = ?
       WHERE id = ?`,
      [
        r.pet_id,
        r.type,
        r.title ?? null,
        r.datetime,
        r.status ?? null,
        r.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM reminders WHERE id = ?', [id])
  }
}
