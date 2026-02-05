import { db } from '../connection/database'
import { Pet } from '../models/Pet'

export const PetRepository = {
  create(pet: Pet) {
    db.runSync(
      'INSERT INTO pets (name, birth_date, weight) VALUES (?, ?, ?)',
      [pet.name, pet.birth_date ?? null, pet.weight ?? null]
    )
  },

  findAll(): Pet[] {
    return db.getAllSync('SELECT * FROM pets')
  }
}
