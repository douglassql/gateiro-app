import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PetRepository } from '@/database/repositories/PetRepository'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'
import * as ImagePicker from 'expo-image-picker'
import { colors } from '@/theme/colors'

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

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    })

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri)
    }
  }

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
      <DateField
        label="Data de nascimento (opcional)"
        value={birthDate}
        onChange={setBirthDate}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
      />
      <View style={{ height: 8 }} />
      <Text style={{ marginBottom: 6, color: colors.secondaryText }}>Foto (opcional)</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          onPress={handlePickImage}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card
          }}
        >
          <Text style={{ color: colors.primaryText }}>Selecionar imagem</Text>
        </TouchableOpacity>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
        ) : null}
      </View>
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
