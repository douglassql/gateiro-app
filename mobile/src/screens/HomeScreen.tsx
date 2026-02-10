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
import { reminderTypeLabels } from '@/database/models/Reminder'
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
    photoUri?: string
    vaccines: number
    medications: number
    reminders: number
    consultations: number
    nextVaccine: string | null
    nextReminder: string | null
    nextReminderLabel: string | null
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
        .map(r => ({
          date: new Date(r.datetime),
          type: r.type,
          title: r.title
        }))
        .filter(r => !Number.isNaN(r.date.getTime()) && r.date.getTime() >= now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

      return {
        id: pet.id as number,
        name: pet.name,
        photoUri: pet.photo_uri ?? undefined,
        vaccines: petVaccines.length,
        medications: petMedications.length,
        reminders: petReminders.length,
        consultations: petConsultations.length,
        nextVaccine: upcomingVaccine ? upcomingVaccine.toLocaleDateString('pt-BR') : null,
        nextReminder: upcomingReminder ? upcomingReminder.date.toLocaleString('pt-BR') : null,
        nextReminderLabel: upcomingReminder
          ? (upcomingReminder.title || reminderTypeLabels[upcomingReminder.type])
          : null
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

  const accentPalette = ['#FDE68A', '#BAE6FD', '#FBCFE8', '#BBF7D0', '#FED7AA', '#DDD6FE']
  const statBackgrounds = {
    vaccines: '#F3E8FF',
    medications: '#FEF3C7',
    reminders: '#E0F2FE',
    consultations: '#FCE7F3'
  }
  const statIconColors = {
    vaccines: colors.accentPurple,
    medications: colors.accentOrange,
    reminders: '#0EA5E9',
    consultations: '#EC4899'
  }

  function getAccentColor(id: number) {
    return accentPalette[id % accentPalette.length]
  }

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
                  borderRadius: 16,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginBottom: 14,
                  overflow: 'hidden'
                }}
              >
                <View style={{ height: 6, backgroundColor: getAccentColor(card.id) }} />
                <View style={{ padding: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Pets')}
                      style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}
                    >
                      {card.photoUri ? (
                        <Image
                          source={{ uri: card.photoUri }}
                          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.card,
                            borderWidth: 1,
                            borderColor: colors.border,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 10
                          }}
                        >
                          <Ionicons name="paw-outline" size={18} color={colors.primaryText} />
                        </View>
                      )}
                      <View>
                        <Text style={typography.subtitle} numberOfLines={1}>{card.name}</Text>
                        <Text style={[typography.body, { marginTop: 2 }]}>Resumo rapido</Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: getAccentColor(card.id)
                      }}
                    >
                      <Text style={{ fontSize: 12, color: colors.primaryText }}>Pet</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: statBackgrounds.vaccines,
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    >
                      <Ionicons name="shield-checkmark-outline" size={16} color={statIconColors.vaccines} />
                      <Text style={[typography.body, { marginLeft: 6 }]}>Vacinas {card.vaccines}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: statBackgrounds.medications,
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    >
                      <Ionicons name="medkit-outline" size={16} color={statIconColors.medications} />
                      <Text style={[typography.body, { marginLeft: 6 }]}>Medicamentos {card.medications}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: statBackgrounds.reminders,
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    >
                      <Ionicons name="notifications-outline" size={16} color={statIconColors.reminders} />
                      <Text style={[typography.body, { marginLeft: 6 }]}>Lembretes {card.reminders}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: statBackgrounds.consultations,
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    >
                      <Ionicons name="calendar-outline" size={16} color={statIconColors.consultations} />
                      <Text style={[typography.body, { marginLeft: 6 }]}>Consultas {card.consultations}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                    <View
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        backgroundColor: '#FFF',
                        borderWidth: 1,
                        borderColor: colors.border,
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    >
                      <Text style={{ fontSize: 12, color: colors.secondaryText }}>
                        Proxima vacina: {card.nextVaccine ?? 'Sem data'}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 4,
                      paddingVertical: 8,
                      paddingHorizontal: 10,
                      borderRadius: 12,
                      backgroundColor: statBackgrounds.reminders,
                      borderWidth: 1,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ fontSize: 12, color: colors.primaryText }}>
                      Proximo lembrete: {card.nextReminderLabel ?? 'Sem data'}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.secondaryText, marginTop: 2 }}>
                      {card.nextReminder ?? 'Sem data'}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', marginTop: 6 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Pets')}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: colors.border,
                        marginRight: 8
                      }}
                    >
                      <Text style={{ color: colors.primaryText }}>Ver perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Reminders', { petId: card.id })}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: colors.border
                      }}
                    >
                      <Text style={{ color: colors.primaryText }}>Lembretes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View
          style={{
            marginTop: 16,
            borderRadius: 16,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden'
          }}
        >
          <View style={{ height: 6, backgroundColor: colors.accentOrange }} />
          <View style={{ padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={typography.subtitle}>Racao (geral)</Text>
                <Text style={[typography.body, { marginTop: 2 }]}>Estoque e compras recentes</Text>
              </View>
              <Ionicons name="restaurant-outline" size={20} color={colors.accentOrange} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginRight: 8,
                  marginBottom: 8
                }}
              >
                <Text style={{ fontSize: 12, color: colors.secondaryText }}>Itens: {foodSummary.count}</Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginRight: 8,
                  marginBottom: 8
                }}
              >
                <Text style={{ fontSize: 12, color: colors.secondaryText }}>
                  Ultima compra: {foodSummary.latestPurchase ?? 'Sem data'}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginRight: 8,
                  marginBottom: 8
                }}
              >
                <Text style={{ fontSize: 12, color: colors.secondaryText }}>
                  Marca: {foodSummary.latestBrand ?? 'Sem marca'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{
                marginTop: 8,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
                alignSelf: 'flex-start'
              }}
            >
              <Text style={{ color: colors.primaryText }}>Gerenciar racao</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
