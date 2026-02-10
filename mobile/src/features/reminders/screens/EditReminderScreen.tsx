import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { ReminderType, reminderTypeLabels } from '@/database/models/Reminder'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

type RouteParams = {
  id: number
}

const TYPES: ReminderType[] = ['vaccine', 'medication', 'feeding', 'general']

export default function EditReminderScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { pets } = usePets()

  const { id } = (route.params as unknown as RouteParams)

  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const [type, setType] = useState<ReminderType>('general')
  const [datetime, setDatetime] = useState('')
  const [status, setStatus] = useState<'pendente' | 'feito' | 'cancelado'>('pendente')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const reminder = ReminderRepository.findById(id)
    if (reminder) {
      setSelectedPetId(reminder.pet_id)
      setType(reminder.type)
      setDatetime(reminder.datetime)
      setStatus(reminder.status ?? 'pendente')
      setTitle(reminder.title ?? '')
    }
  }, [id])

  function handleSave() {
    if (!selectedPetId) return
    ReminderRepository.update({
      id,
      pet_id: selectedPetId,
      type,
      title: title.trim() || undefined,
      datetime,
      status
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
      <Header icon="notifications-outline" title="Editar lembrete" />

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
      <Text style={typography.body}>Status:</Text>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {(['pendente', 'feito', 'cancelado'] as const).map(option => {
          const selected = status === option
          return (
            <TouchableOpacity
              key={option}
              onPress={() => setStatus(option)}
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
              <Text style={{ color: colors.primaryText }}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

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
