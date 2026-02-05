import { useEffect, useState } from 'react'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { Reminder } from '@/database/models/Reminder'

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])

  function load() {
    const data = ReminderRepository.findAll()
    setReminders(data)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    reminders,
    reload: load
  }
}
