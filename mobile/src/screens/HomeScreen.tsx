import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '../navigation/types'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import ScreenContainer from '@/components/ScreenContainer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { MedicationRepository } from '@/database/repositories/MedicationRepository'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'

type NavigationProps = BottomTabNavigationProp<RootTabParamList>

const FIRST_RUN_KEY = 'gateiro:first-run-seen'

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [summary, setSummary] = useState({
    pets: 0,
    vaccines: 0,
    medications: 0,
    reminders: 0,
    foodStocks: 0,
    consultations: 0,
    nextVaccine: '' as string | null,
    nextReminder: '' as string | null
  })

  const loadSummary = useCallback(() => {
    const pets = PetRepository.findAll()
    const vaccines = VaccineRepository.findAll()
    const medications = MedicationRepository.findAll()
    const reminders = ReminderRepository.findAll()
    const foodStocks = FoodStockRepository.findAll()
    const consultations = ConsultationRepository.findAll()

    const now = Date.now()
    const upcomingVaccine = vaccines
      .filter(v => v.next_date)
      .map(v => new Date(v.next_date as string))
      .filter(d => !Number.isNaN(d.getTime()) && d.getTime() >= now)
      .sort((a, b) => a.getTime() - b.getTime())[0]

    const upcomingReminder = reminders
      .map(r => new Date(r.datetime))
      .filter(d => !Number.isNaN(d.getTime()) && d.getTime() >= now)
      .sort((a, b) => a.getTime() - b.getTime())[0]

    setSummary({
      pets: pets.length,
      vaccines: vaccines.length,
      medications: medications.length,
      reminders: reminders.length,
      foodStocks: foodStocks.length,
      consultations: consultations.length,
      nextVaccine: upcomingVaccine ? upcomingVaccine.toLocaleDateString('pt-BR') : null,
      nextReminder: upcomingReminder ? upcomingReminder.toLocaleString('pt-BR') : null
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadSummary()
    }, [loadSummary])
  )

  useFocusEffect(
    useCallback(() => {
      let active = true

      AsyncStorage.getItem(FIRST_RUN_KEY).then(value => {
        if (!active) return
        setHasSeenIntro(value === '1')
      })

      return () => {
        active = false
      }
    }, [])
  )

  async function handleStart() {
    await AsyncStorage.setItem(FIRST_RUN_KEY, '1')
    setHasSeenIntro(true)
    navigation.navigate('Pets')
  }

  return (
    <ScreenContainer variant="home">
      <View style={{ flex: 1, padding: 8 }}>
        {!hasSeenIntro ? (
          <View
            style={{
              borderRadius: 16,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 16,
              marginBottom: 16
            }}
          >
            <Text style={typography.titleMedium}>Bem-vindo ao Gateiro</Text>
            <Text style={[typography.body, { marginTop: 6 }]}>Organize vacinas, medicamentos e cuidados do seu gato.</Text>
            <TouchableOpacity
              onPress={handleStart}
              style={{
                marginTop: 12,
                backgroundColor: colors.primaryText,
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 16 }}>Vamos comecar</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Pets</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.pets}</Text>
          </View>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Lembretes</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.reminders}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Vacinas</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.vaccines}</Text>
          </View>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Medicamentos</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.medications}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Racao</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.foodStocks}</Text>
          </View>
          <View style={{ flex: 1, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={[typography.subtitle, { color: colors.primaryText }]}>Consultas</Text>
            <Text style={[typography.titleLarge, { marginTop: 4 }]}>{summary.consultations}</Text>
          </View>
        </View>

        <View style={{ marginTop: 16, padding: 12, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
          <Text style={[typography.subtitle, { color: colors.primaryText }]}>Proximos eventos</Text>
          <Text style={[typography.body, { marginTop: 6 }]}>Proxima vacina: {summary.nextVaccine ?? 'Sem data'}</Text>
          <Text style={[typography.body, { marginTop: 4 }]}>Proximo lembrete: {summary.nextReminder ?? 'Sem data'}</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 18 }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1592790331635-35b079a277f1?q=80&w=600&auto=format&fit=crop' }}
            style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 4, borderColor: '#FFF' }}
          />
        </View>
      </View>
    </ScreenContainer>
  )
}
