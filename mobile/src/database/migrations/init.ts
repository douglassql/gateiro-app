import { db } from '../connection/database'

export function runMigrations() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birth_date TEXT,
      weight REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)
}
