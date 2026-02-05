import { View, TextInput, Button, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PetRepository } from '@/database/repositories/PetRepository'

type RouteParams = {
  id: number
}

export default function EditPetScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = (route.params as unknown as RouteParams)

  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')

  useEffect(() => {
    const pet = PetRepository.findById(id)
    if (pet) {
      setName(pet.name)
      setBirthDate(pet.birth_date ?? '')
      setWeight(pet.weight != null ? String(pet.weight) : '')
    }
  }, [id])

  function handleSave() {
    if (!name) return
    PetRepository.update({
      id,
      name,
      birth_date: birthDate || undefined,
      weight: weight ? Number(weight) : undefined
    })
    navigation.goBack()
  }

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Editar pet</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Data de nascimento (ISO opcional)"
        value={birthDate}
        onChangeText={setBirthDate}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
      />
      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
