import AsyncStorage from '@react-native-async-storage/async-storage'

export type GateiroProfile = {
  name: string
  photoUri?: string
}

const PROFILE_KEY = 'gateiro:profile'

export async function loadProfile(): Promise<GateiroProfile | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as GateiroProfile
  } catch {
    return null
  }
}

export async function saveProfile(profile: GateiroProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}
