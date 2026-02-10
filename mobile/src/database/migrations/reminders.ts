import { db } from '../connection/database'

export function createReminderTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      title TEXT,
      datetime TEXT NOT NULL,
      status TEXT
    );
  `)

  const columns = db.getAllSync('PRAGMA table_info(reminders)') as Array<{ name: string }>
  const columnNames = new Set(columns.map(col => col.name))

  if (!columnNames.has('title')) {
    db.execSync('ALTER TABLE reminders ADD COLUMN title TEXT')
  }
}
