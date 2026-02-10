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

  const petColumns = db.getAllSync('PRAGMA table_info(pets)') as Array<{ name: string }>
  const columnNames = new Set(petColumns.map(col => col.name))

  if (!columnNames.has('photo_uri')) {
    db.execSync('ALTER TABLE pets ADD COLUMN photo_uri TEXT')
  }

  if (!columnNames.has('traits')) {
    db.execSync('ALTER TABLE pets ADD COLUMN traits TEXT')
  }

  if (!columnNames.has('notes')) {
    db.execSync('ALTER TABLE pets ADD COLUMN notes TEXT')
  }

  createMedicationTable()
  createVaccineTable()
  createReminderTable()
  createFoodStockTable()
  createConsultationsTable()
}
