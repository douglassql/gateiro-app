import { db } from '../connection/database'

export function createReminderTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      datetime TEXT NOT NULL,
      status TEXT
    );
  `)
}
