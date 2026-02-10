import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from './types'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'


import HomeScreen from '../screens/HomeScreen'
import ContentScreen from '../screens/ContentScreen'
import SettingsScreen from '../screens/SettingsScreen'
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
import EditReminderScreen from '../features/reminders/screens/EditReminderScreen'
import FoodStockListScreen from '../features/feeding/screens/FoodStockListScreen'
import AddFoodStockScreen from '../features/feeding/screens/AddFoodStockScreen'
import EditFoodStockScreen from '../features/feeding/screens/EditFoodStockScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accentPurple,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case 'Home':
                return 'home-outline'
              case 'Pets':
                return 'paw-outline'
              case 'Reminders':
                return 'notifications-outline'
              case 'Content':
                return 'book-outline'
              case 'Settings':
                return 'settings-outline'
              default:
                return 'ellipse-outline'
            }
          })()

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsListScreen} />
      <Tab.Screen name="Reminders" component={RemindersListScreen} />
      <Tab.Screen name="Content" component={ContentScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={MainTabs}
          options={{ headerShown: false }}
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
          name="AddReminder"
          component={AddReminderScreen}
        />

        <Stack.Screen
          name="EditReminder"
          component={EditReminderScreen}
        />

        <Stack.Screen
          name="FoodStock"
          component={FoodStockListScreen}
        />

        <Stack.Screen
          name="AddFoodStock"
          component={AddFoodStockScreen}
        />

        <Stack.Screen
          name="EditFoodStock"
          component={EditFoodStockScreen}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}
