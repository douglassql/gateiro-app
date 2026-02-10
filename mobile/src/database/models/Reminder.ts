export type ReminderType = 'vaccine' | 'medication' | 'feeding' | 'general'

export const reminderTypeLabels: Record<ReminderType, string> = {
  vaccine: 'Vacina',
  medication: 'Medicamento',
  feeding: 'Alimentacao',
  general: 'Geral'
}

export interface Reminder {
  id?: number
  pet_id: number
  type: ReminderType
  datetime: string
  status?: 'pendente' | 'feito' | 'cancelado'
}
