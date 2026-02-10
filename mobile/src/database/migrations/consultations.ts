import { db } from '../connection/database'

export function createConsultationsTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT
    );
  `)
}
