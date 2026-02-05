export type ReminderType = 'vacina' | 'remedio' | 'alimentacao' | 'geral'

export interface Reminder {
  id?: number
  pet_id: number
  type: ReminderType
  datetime: string
  status?: 'pendente' | 'feito' | 'cancelado'
}
