import { db } from '../connection/database'

export function createFoodStockTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS food_stock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL DEFAULT 0,
      brand TEXT NOT NULL,
      quantity_current REAL NOT NULL,
      quantity_initial REAL,
      purchase_date TEXT,
      estimated_end TEXT
    );
  `)
}
