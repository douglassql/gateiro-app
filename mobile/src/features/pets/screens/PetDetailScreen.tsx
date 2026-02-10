import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PetRepository } from '@/database/repositories/PetRepository'
import Chip from '@/components/Chip'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import CardButton from '@/components/CardButton'
import { RootStackParamList } from '@/navigation/types'
import { useCallback, useState } from 'react'
import { Pet } from '@/database/models/Pet'

type RouteParams = {
  id: number
}

function getAgeGroup(birth?: string) {
  if (!birth) return 'Sem idade'
  const d = new Date(birth)
  if (isNaN(d.getTime())) return 'Sem idade'
  const diffYears = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  if (diffYears < 1) return 'Junior'
  if (diffYears < 8) return 'Adulto'
  return 'Sênior'
}

export default function PetDetailScreen() {
  const route = useRoute()
  const { id } = route.params as unknown as RouteParams
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [pet, setPet] = useState<Pet | null>(null)

  useFocusEffect(
    useCallback(() => {
      const data = PetRepository.findById(id)
      setPet(data)
    }, [id])
  )

  if (!pet) {
    return (
      <ScreenContainer variant="detail">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Pet nao encontrado</Text>
        </View>
      </ScreenContainer>
    )
  }

  const ageGroup = getAgeGroup(pet.birth_date)

  return (
    <ScreenContainer variant="detail">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Header icon="paw-outline" title="Perfil do pet" />

        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          {pet.photo_uri ? (
            <Image
              source={{ uri: pet.photo_uri }}
              style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: colors.card }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                backgroundColor: colors.card,
                borderWidth: 2,
                borderColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={[typography.titleLarge, { color: colors.primaryText }]}>
                {pet.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={typography.titleMedium}>{pet.name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditPet', { id })}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card
            }}
          >
            <Text style={{ color: colors.primaryText }}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12, marginTop: 8 }}>
          <Chip label={ageGroup} />
          {pet.weight != null ? <Chip label={`${pet.weight} kg`} /> : null}
        </View>

        <Text style={[typography.body, { marginBottom: 16 }]}>Use este perfil para acompanhar saude, alimentacao e rotina.</Text>

        <Text style={[typography.subtitle, { marginBottom: 6 }]}>Caracteristicas</Text>
        <Text style={[typography.body, { marginBottom: 12 }]}>
          {pet.traits && pet.traits.trim().length > 0 ? pet.traits : 'Nao informado'}
        </Text>

        <Text style={[typography.subtitle, { marginBottom: 6 }]}>Sobre</Text>
        <Text style={[typography.body, { marginBottom: 16 }]}>
          {pet.notes && pet.notes.trim().length > 0 ? pet.notes : 'Nao informado'}
        </Text>

        <Text style={[typography.subtitle, { marginBottom: 8 }]}>Acessos rapidos</Text>
        <View>
          <CardButton
            iconName="shield-checkmark-outline"
            title="Vacinas"
            subtitle="Historico e proximas doses"
            onPress={() => navigation.navigate('Vaccines')}
          />
          <View style={{ height: 12 }} />
          <CardButton
            iconName="medkit-outline"
            title="Medicamentos"
            subtitle="Controle de tratamentos"
            onPress={() => navigation.navigate('Medications')}
          />
          <View style={{ height: 12 }} />
          <CardButton
            iconName="notifications-outline"
            title="Lembretes"
            subtitle="Rotina e avisos"
            onPress={() => navigation.navigate('Tabs', { screen: 'Reminders' })}
          />
          <View style={{ height: 12 }} />
          <CardButton
            iconName="restaurant-outline"
            title="Alimentacao"
            subtitle="Controle de racao"
            onPress={() => navigation.navigate('FoodStock')}
          />
          <View style={{ height: 12 }} />
          <CardButton
            iconName="calendar-outline"
            title="Consultas"
            subtitle="Historico veterinario"
            onPress={() => navigation.navigate('Consultations')}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
