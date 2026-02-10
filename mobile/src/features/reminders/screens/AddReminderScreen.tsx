import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { ReminderType, reminderTypeLabels } from '@/database/models/Reminder'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import * as Notifications from 'expo-notifications'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

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
      title: title.trim() || undefined,
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

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    color: colors.primaryText
  } as const

  const chipStyle = {
    padding: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6
  } as const

  const chipSelectedStyle = {
    borderColor: colors.accentPurple
  } as const

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
              style={[chipStyle, selected ? chipSelectedStyle : null]}
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
              style={[
                {
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  borderWidth: 1,
                  marginRight: 6,
                  borderColor: colors.border
                },
                selected ? { borderColor: colors.accentPurple } : null
              ]}
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
        style={inputStyle}
      />

      <View style={{ height: 8 }} />
      <DateField
        label="Data e hora"
        value={datetime}
        mode="datetime"
        onChange={setDatetime}
      />

      <View style={{ height: 12 }} />
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: colors.primaryText,
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Salvar</Text>
      </TouchableOpacity>
    </ScreenContainer>
  )
}
