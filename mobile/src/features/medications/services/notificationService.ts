import * as Notifications from 'expo-notifications'

export async function scheduleMedicationReminder(date: Date, title: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora do medicamento 💊',
      body: title
    },
    trigger: { date }
  })
}
