import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View>
      <Text>Gateiro App 🐱</Text>

      <Button
        title="Ver medicamentos"
        onPress={() => navigation.navigate('Medications')}
      />
    </View>
  )
}
