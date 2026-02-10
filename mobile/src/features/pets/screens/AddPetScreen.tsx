import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native'
import { useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { useNavigation } from '@react-navigation/native'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'
import * as ImagePicker from 'expo-image-picker'
import { colors } from '@/theme/colors'

export default function AddPetScreen() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')
  const [photoUri, setPhotoUri] = useState('')
  const [traits, setTraits] = useState('')
  const [notes, setNotes] = useState('')
  const navigation = useNavigation()

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

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    color: colors.primaryText
  } as const

  return (
    <ScreenContainer variant="form">
      <Header icon="paw-outline" title="Novo pet" />
      <TextInput
        placeholder="Nome do pet"
        value={name}
        onChangeText={setName}
        style={inputStyle}
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
        style={inputStyle}
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
        style={inputStyle}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Sobre o pet (opcional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        style={[inputStyle, { minHeight: 90 }]}
      />
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
