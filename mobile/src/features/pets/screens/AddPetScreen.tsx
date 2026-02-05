import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { useNavigation } from '@react-navigation/native'

export default function AddPetScreen() {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function handleSave() {
    PetRepository.create({
      name,
      birth_date: new Date().toISOString()
    })
    navigation.goBack()
  }

  return (
    <View>
      <TextInput
        placeholder="Nome do pet"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
