import { db } from '../connection/database'

export function createVaccineTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS vaccines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      date TEXT,
      next_date TEXT,
      notes TEXT
    );
  `)
}
