import { View, TextInput, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PetRepository } from '@/database/repositories/PetRepository'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

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
  const [photoUri, setPhotoUri] = useState('')
  const [traits, setTraits] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const pet = PetRepository.findById(id)
    if (pet) {
      setName(pet.name)
      setBirthDate(pet.birth_date ?? '')
      setWeight(pet.weight != null ? String(pet.weight) : '')
      setPhotoUri(pet.photo_uri ?? '')
      setTraits(pet.traits ?? '')
      setNotes(pet.notes ?? '')
    }
  }, [id])

  function handleSave() {
    if (!name) return
    PetRepository.update({
      id,
      name,
      birth_date: birthDate || undefined,
      weight: weight ? Number(weight) : undefined,
      photo_uri: photoUri || undefined,
      traits: traits || undefined,
      notes: notes || undefined
    })
    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="paw-outline" title="Editar pet" />
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
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Foto (URL opcional)"
        value={photoUri}
        onChangeText={setPhotoUri}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Caracteristicas (ex.: calmo, carinhoso)"
        value={traits}
        onChangeText={setTraits}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Sobre o pet (opcional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />
      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
