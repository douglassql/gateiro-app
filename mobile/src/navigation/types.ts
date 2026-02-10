import { NavigatorScreenParams } from '@react-navigation/native'

export type RootTabParamList = {
  Home: undefined
  Pets: undefined
  Reminders: { petId?: number } | undefined
  Content: undefined
  Settings: undefined
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList>
  Medications: undefined
  AddMedication: undefined
  Pets: undefined
  AddPet: undefined
  PetDetail: { id: number }
  Vaccines: undefined
  AddVaccine: undefined
  EditVaccine: { id: number }
  EditPet: { id: number }
  EditMedication: { id: number }
  AddReminder: undefined
  EditReminder: { id: number }
  FoodStock: undefined
  AddFoodStock: undefined
  EditFoodStock: { id: number }
  Consultations: undefined
  AddConsultation: undefined
  EditConsultation: { id: number }
}
