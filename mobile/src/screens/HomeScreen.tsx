import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '../navigation/types'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import ScreenContainer from '@/components/ScreenContainer'
import { useCallback, useMemo, useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { MedicationRepository } from '@/database/repositories/MedicationRepository'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import { GateiroProfile, loadProfile, saveProfile } from '@/storage/profile'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'

type NavigationProps = BottomTabNavigationProp<RootTabParamList>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()
  const [profile, setProfile] = useState<GateiroProfile | null>(null)
  const [draftName, setDraftName] = useState('')
  const [draftPhoto, setDraftPhoto] = useState('')
  const [petCards, setPetCards] = useState<Array<{
    id: number
    name: string
    vaccines: number
    medications: number
    reminders: number
    consultations: number
    nextVaccine: string | null
    nextReminder: string | null
  }>>([])
  const [foodSummary, setFoodSummary] = useState({
    count: 0,
    latestBrand: null as string | null,
    latestPurchase: null as string | null
  })

  const loadSummary = useCallback(() => {
    const pets = PetRepository.findAll()
    const vaccines = VaccineRepository.findAll()
    const medications = MedicationRepository.findAll()
    const reminders = ReminderRepository.findAll()
    const foodStocks = FoodStockRepository.findAll()
    const consultations = ConsultationRepository.findAll()

    const now = Date.now()

    const cards = pets.map(pet => {
      const petVaccines = vaccines.filter(v => v.pet_id === pet.id)
      const petMedications = medications.filter(m => m.pet_id === pet.id)
      const petReminders = reminders.filter(r => r.pet_id === pet.id)
      const petConsultations = consultations.filter(c => c.pet_id === pet.id)

      const upcomingVaccine = petVaccines
        .filter(v => v.next_date)
        .map(v => new Date(v.next_date as string))
        .filter(d => !Number.isNaN(d.getTime()) && d.getTime() >= now)
        .sort((a, b) => a.getTime() - b.getTime())[0]

      const upcomingReminder = petReminders
        .map(r => new Date(r.datetime))
        .filter(d => !Number.isNaN(d.getTime()) && d.getTime() >= now)
        .sort((a, b) => a.getTime() - b.getTime())[0]

      return {
        id: pet.id as number,
        name: pet.name,
        vaccines: petVaccines.length,
        medications: petMedications.length,
        reminders: petReminders.length,
        consultations: petConsultations.length,
        nextVaccine: upcomingVaccine ? upcomingVaccine.toLocaleDateString('pt-BR') : null,
        nextReminder: upcomingReminder ? upcomingReminder.toLocaleString('pt-BR') : null
      }
    })

    const latestFood = foodStocks
      .filter(fs => fs.purchase_date)
      .map(fs => ({
        brand: fs.brand,
        date: new Date(fs.purchase_date as string)
      }))
      .filter(item => !Number.isNaN(item.date.getTime()))
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0]

    setPetCards(cards)
    setFoodSummary({
      count: foodStocks.length,
      latestBrand: latestFood ? latestFood.brand : null,
      latestPurchase: latestFood ? latestFood.date.toLocaleDateString('pt-BR') : null
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
      loadProfile().then(data => {
        if (!active) return
        setProfile(data)
        setDraftName(data?.name ?? '')
        setDraftPhoto(data?.photoUri ?? '')
      })

      return () => {
        active = false
      }
    }, [])
  )

  const greeting = useMemo(() => {
    if (!profile?.name) return 'Ola, gateiro'
    return `Ola, ${profile.name}`
  }, [profile?.name])

  async function handlePickProfileImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    })

    if (!result.canceled && result.assets.length > 0) {
      setDraftPhoto(result.assets[0].uri)
    }
  }

  async function handleCreateProfile() {
    if (!draftName.trim()) return
    const nextProfile: GateiroProfile = {
      name: draftName.trim(),
      photoUri: draftPhoto || undefined
    }
    await saveProfile(nextProfile)
    setProfile(nextProfile)
  }

  return (
    <ScreenContainer variant="home">
      <ScrollView contentContainerStyle={{ padding: 8, paddingBottom: 24 }}>
        {!profile ? (
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
            <Text style={typography.titleMedium}>Criar perfil do gateiro</Text>
            <Text style={[typography.body, { marginTop: 6 }]}>Adicione seu nome e uma foto para personalizar o app.</Text>
            <View style={{ height: 12 }} />
            <TextInput
              placeholder="Seu nome"
              value={draftName}
              onChangeText={setDraftName}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: '#FFF'
              }}
            />
            <View style={{ height: 12 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={handlePickProfileImage}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card
                }}
              >
                <Text style={{ color: colors.primaryText }}>Selecionar foto</Text>
              </TouchableOpacity>
              {draftPhoto ? (
                <Image
                  source={{ uri: draftPhoto }}
                  style={{ width: 48, height: 48, borderRadius: 24, marginLeft: 12 }}
                />
              ) : null}
            </View>
            <TouchableOpacity
              onPress={handleCreateProfile}
              style={{
                marginTop: 12,
                backgroundColor: colors.primaryText,
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 16 }}>Salvar perfil</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={{
            borderRadius: 16,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {profile?.photoUri ? (
            <Image
              source={{ uri: profile.photoUri }}
              style={{ width: 56, height: 56, borderRadius: 28 }}
            />
          ) : (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: colors.primaryText, fontSize: 18 }}>
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'G'}
              </Text>
            </View>
          )}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={typography.subtitle}>{greeting}</Text>
            <Text style={[typography.body, { marginTop: 4 }]}>Resumo do seu dia com seus pets.</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <Text style={{ color: colors.primaryText }}>Editar</Text>
          </TouchableOpacity>
        </View>

        <Text style={[typography.subtitle, { marginBottom: 8 }]}>Pets</Text>
        {petCards.length === 0 ? (
          <View style={{ padding: 14, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <Text style={typography.body}>Nenhum pet cadastrado.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Pets')} style={{ marginTop: 8 }}>
              <Text style={{ color: colors.primaryText }}>Adicionar pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {petCards.map(card => (
              <View
                key={card.id}
                style={{
                  borderRadius: 14,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 14,
                  marginBottom: 12
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={[typography.subtitle, { marginBottom: 6 }]}>{card.name}</Text>
                  <Ionicons name="paw-outline" size={18} color={colors.accentPurple} />
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 6 }}>
                    <Ionicons name="shield-checkmark-outline" size={14} color={colors.accentPurple} />
                    <Text style={typography.body}>Vacinas: {card.vaccines}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 6 }}>
                    <Ionicons name="medkit-outline" size={14} color={colors.accentPurple} />
                    <Text style={typography.body}>Medicamentos: {card.medications}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 6 }}>
                    <Ionicons name="notifications-outline" size={14} color={colors.accentPurple} />
                    <Text style={typography.body}>Lembretes: {card.reminders}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 6 }}>
                    <Ionicons name="calendar-outline" size={14} color={colors.accentPurple} />
                    <Text style={typography.body}>Consultas: {card.consultations}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 8 }}>
                  <Text style={typography.body}>Proxima vacina: {card.nextVaccine ?? 'Sem data'}</Text>
                  <Text style={[typography.body, { marginTop: 2 }]}>Proximo lembrete: {card.nextReminder ?? 'Sem data'}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Pets')}
                  style={{ marginTop: 10 }}
                >
                  <Text style={{ color: colors.primaryText }}>Ver perfil</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={{ marginTop: 16, padding: 14, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[typography.subtitle, { marginBottom: 6 }]}>Racao (geral)</Text>
            <Ionicons name="restaurant-outline" size={18} color={colors.accentOrange} />
          </View>
          <Text style={typography.body}>Itens cadastrados: {foodSummary.count}</Text>
          <Text style={[typography.body, { marginTop: 4 }]}>Ultima compra: {foodSummary.latestPurchase ?? 'Sem data'}</Text>
          <Text style={[typography.body, { marginTop: 2 }]}>Marca: {foodSummary.latestBrand ?? 'Sem marca'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginTop: 8 }}>
            <Text style={{ color: colors.primaryText }}>Gerenciar racao</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
