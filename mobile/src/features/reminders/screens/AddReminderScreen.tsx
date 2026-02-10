import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { ReminderType, reminderTypeLabels } from '@/database/models/Reminder'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import * as Notifications from 'expo-notifications'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

const TYPES: ReminderType[] = ['vaccine', 'medication', 'feeding', 'general']

export default function AddReminderScreen() {
  const navigation = useNavigation()
  const { pets } = usePets()
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const [type, setType] = useState<ReminderType>('general')
  const [datetime, setDatetime] = useState(new Date().toISOString())
  const [title, setTitle] = useState('')

  function handleSave() {
    if (!selectedPetId) return
    ReminderRepository.create({
      pet_id: selectedPetId,
      type,
      datetime,
      status: 'pendente'
    })

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete',
        body: title || `${reminderTypeLabels[type]} para seu pet`
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(datetime)
      }
    })

    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="notifications-outline" title="Novo lembrete" />

      <Text style={[typography.body, { marginBottom: 8 }]}>Selecione o pet:</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => {
          const selected = selectedPetId === item.id
          return (
            <TouchableOpacity
              onPress={() => setSelectedPetId(item.id!)}
              style={{
                padding: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected ? colors.accentPurple : colors.border,
                borderRadius: 6
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={{ height: 12 }} />
      <Text style={typography.body}>Tipo:</Text>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {TYPES.map(t => {
          const selected = t === type
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: selected ? colors.accentPurple : colors.border,
                marginRight: 6
              }}
            >
              <Text>{reminderTypeLabels[t]}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={{ height: 12 }} />
      <TextInput
        placeholder="Título (opcional)"
        value={title}
        onChangeText={setTitle}
      />

      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Data e hora (ISO)"
        value={datetime}
        onChangeText={setDatetime}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
