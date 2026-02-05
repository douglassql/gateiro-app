import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import MedicationListScreen from '../features/medications/screens/MedicationListScreen'
import AddMedicationScreen from '../features/medications/screens/AddMedicationScreen'

const Stack = createNativeStackNavigator()

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

      </Stack.Navigator>
    </NavigationContainer>
  )
}
