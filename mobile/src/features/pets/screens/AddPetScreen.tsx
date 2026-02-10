import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { useNavigation } from '@react-navigation/native'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

export default function AddPetScreen() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')
  const [photoUri, setPhotoUri] = useState('')
  const [traits, setTraits] = useState('')
  const [notes, setNotes] = useState('')
  const navigation = useNavigation()

  function handleSave() {
    if (!name) return
    PetRepository.create({
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
      <Header icon="paw-outline" title="Novo pet" />
      <TextInput
        placeholder="Nome do pet"
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
