import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Gateiro App 🐱
      </Text>

      <Button
        title="📋 Ver medicamentos"
        onPress={() => navigation.navigate('Medications')}
      />

      <View style={{ height: 10 }} />

      <Button
        title="➕ Adicionar medicamento"
        onPress={() => navigation.navigate('AddMedication')}
      />

      <View style={{ height: 10 }} />

      <Button
        title="🐱 Ver pets"
        onPress={() => navigation.navigate('Pets')}
      />

      <View style={{ height: 10 }} />

      <Button
        title="➕ Adicionar pet"
        onPress={() => navigation.navigate('AddPet')}
      />

      <View style={{ height: 10 }} />

      <Button
        title="🛡️ Ver vacinas"
        onPress={() => navigation.navigate('Vaccines')}
      />

      <View style={{ height: 10 }} />

      <Button
        title="➕ Adicionar vacina"
        onPress={() => navigation.navigate('AddVaccine')}
      />
    </View>
  )
}
