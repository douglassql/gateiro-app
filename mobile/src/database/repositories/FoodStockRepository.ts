import { db } from '../connection/database'
import { FoodStock } from '../models/FoodStock'

export const FoodStockRepository = {
  create(item: FoodStock) {
    const petId = item.pet_id ?? 0
    db.runSync(
      `INSERT INTO food_stock
       (pet_id, brand, quantity_current, quantity_initial, purchase_date, estimated_end)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        petId,
        item.brand,
        item.quantity_current,
        item.quantity_initial ?? null,
        item.purchase_date ?? null,
        item.estimated_end ?? null
      ]
    )
  },

  findAll(): FoodStock[] {
    return db.getAllSync('SELECT * FROM food_stock')
  },

  findById(id: number): FoodStock | null {
    const rows = db.getAllSync('SELECT * FROM food_stock WHERE id = ?', [id]) as FoodStock[]
    return (rows[0] ?? null) as FoodStock | null
  },

  update(item: FoodStock) {
    if (!item.id) throw new Error('id e obrigatorio para atualizar estoque')
    const petId = item.pet_id ?? 0
    db.runSync(
      `UPDATE food_stock
       SET pet_id = ?, brand = ?, quantity_current = ?, quantity_initial = ?, purchase_date = ?, estimated_end = ?
       WHERE id = ?`,
      [
        petId,
        item.brand,
        item.quantity_current,
        item.quantity_initial ?? null,
        item.purchase_date ?? null,
        item.estimated_end ?? null,
        item.id
      ]
    )
  },

  deleteById(id: number) {
    db.runSync('DELETE FROM food_stock WHERE id = ?', [id])
  }
}
