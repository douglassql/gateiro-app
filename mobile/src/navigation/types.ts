import { NavigatorScreenParams } from '@react-navigation/native'

export type RootTabParamList = {
  Home: undefined
  Pets: undefined
  Reminders: undefined
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
}
