import { db } from '../connection/database'
import { Pet } from '../models/Pet'

export const PetRepository = {
  create(pet: Pet) {
    db.runSync(
      'INSERT INTO pets (name, birth_date, weight, photo_uri, traits, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [
        pet.name,
        pet.birth_date ?? null,
        pet.weight ?? null,
        pet.photo_uri ?? null,
        pet.traits ?? null,
        pet.notes ?? null
      ]
    )
  },

  findAll(): Pet[] {
    return db.getAllSync('SELECT * FROM pets')
  },

  findById(id: number): Pet | null {
    const rows = db.getAllSync('SELECT * FROM pets WHERE id = ?', [id]) as Pet[]
    return (rows[0] ?? null) as Pet | null
  },

  update(pet: Pet) {
    if (!pet.id) throw new Error('id é obrigatório para atualizar pet')
    db.runSync(
      `UPDATE pets
       SET name = ?, birth_date = ?, weight = ?, photo_uri = ?, traits = ?, notes = ?
       WHERE id = ?`,
      [
        pet.name,
        pet.birth_date ?? null,
        pet.weight ?? null,
        pet.photo_uri ?? null,
        pet.traits ?? null,
        pet.notes ?? null,
        pet.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM pets WHERE id = ?', [id])
  }
}
