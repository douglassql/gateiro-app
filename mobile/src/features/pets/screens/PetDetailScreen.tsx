import { View, Text, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { PetRepository } from '@/database/repositories/PetRepository'
import Chip from '@/components/Chip'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'

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
  const pet = PetRepository.findById(id)

  if (!pet) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pet não encontrado</Text>
      </View>
    )
  }

  const ageGroup = getAgeGroup(pet.birth_date)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <View style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555685812-4b74352c2c0f?q=80&w=800&auto=format&fit=crop' }}
            style={{ width: '100%', height: 220 }}
          />
        </View>

        <Text style={[typography.titleMedium, { marginBottom: 8 }]}>{pet.name}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
          <Chip label={ageGroup} />
          {pet.weight != null ? <Chip label={`${pet.weight} kg`} /> : null}
          <Chip label="Carinhoso" />
          <Chip label="Brincalhão" />
        </View>

        <Text style={typography.body}>
          Olá, eu sou {pet.name}! Gato muito especial e companheiro.
          Use este perfil para acompanhar saúde, vacinas e rotina.
        </Text>
      </View>
    </View>
  )
}
