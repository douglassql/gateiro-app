import { db } from '../connection/database'

export function createMedicationTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      dosage TEXT,
      start_date TEXT,
      next_dose_date TEXT,
      interval_hours INTEGER
    );
  `)
}
