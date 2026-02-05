import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'


import HomeScreen from '../screens/HomeScreen'
import MenuScreen from '../screens/MenuScreen'
import MedicationListScreen from '../features/medications/screens/MedicationListScreen'
import AddMedicationScreen from '../features/medications/screens/AddMedicationScreen'
import EditMedicationScreen from '../features/medications/screens/EditMedicationScreen'
import PetsListScreen from '../features/pets/screens/PetsListScreen'
import AddPetScreen from '../features/pets/screens/AddPetScreen'
import EditPetScreen from '../features/pets/screens/EditPetScreen'
import PetDetailScreen from '../features/pets/screens/PetDetailScreen'
import VaccinesListScreen from '../features/vaccines/screens/VaccinesListScreen'
import AddVaccineScreen from '../features/vaccines/screens/AddVaccineScreen'
import EditVaccineScreen from '../features/vaccines/screens/EditVaccineScreen'
import RemindersListScreen from '../features/reminders/screens/RemindersListScreen'
import AddReminderScreen from '../features/reminders/screens/AddReminderScreen'

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
          name="Menu"
          component={MenuScreen}
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
          name="EditMedication"
          component={EditMedicationScreen}
        />

        <Stack.Screen
          name="Pets"
          component={PetsListScreen}
        />

        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
        />

        <Stack.Screen
          name="EditPet"
          component={EditPetScreen}
        />

        <Stack.Screen
          name="PetDetail"
          component={PetDetailScreen}
        />

        <Stack.Screen
          name="Vaccines"
          component={VaccinesListScreen}
        />

        <Stack.Screen
          name="AddVaccine"
          component={AddVaccineScreen}
        />

        <Stack.Screen
          name="EditVaccine"
          component={EditVaccineScreen}
        />

        <Stack.Screen
          name="Reminders"
          component={RemindersListScreen}
        />

        <Stack.Screen
          name="AddReminder"
          component={AddReminderScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
