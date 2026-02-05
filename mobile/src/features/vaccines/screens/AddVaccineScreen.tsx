import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { useNavigation } from '@react-navigation/native'

export default function AddVaccineScreen() {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function handleSave() {
    VaccineRepository.create({
      pet_id: 1,
      name,
      date: new Date().toISOString()
    })
    navigation.goBack()
  }

  return (
    <View>
      <TextInput
        placeholder="Nome da vacina"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
