import { db } from '../connection/database'
import { createMedicationTable } from './medications'
import { createVaccineTable } from './vaccines'
import { createReminderTable } from './reminders'
import { createFoodStockTable } from './food-stock'
import { createConsultationsTable } from './consultations'

export function runMigrations() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birth_date TEXT,
      weight REAL,
      photo_uri TEXT,
      traits TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)

  createMedicationTable()
  createVaccineTable()
  createReminderTable()
  createFoodStockTable()
  createConsultationsTable()
}
