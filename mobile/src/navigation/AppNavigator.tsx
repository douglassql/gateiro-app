import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'


import HomeScreen from '../screens/HomeScreen'
import MedicationListScreen from '../features/medications/screens/MedicationListScreen'
import AddMedicationScreen from '../features/medications/screens/AddMedicationScreen'
import PetsListScreen from '../features/pets/screens/PetsListScreen'
import AddPetScreen from '../features/pets/screens/AddPetScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Medications"
          component={MedicationListScreen}
        />

        <Stack.Screen
          name="AddMedication"
          component={AddMedicationScreen}
        />

        <Stack.Screen
          name="Pets"
          component={PetsListScreen}
        />

        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
