import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import ScreenContainer from '@/components/ScreenContainer'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { GateiroProfile, loadProfile, saveProfile } from '@/storage/profile'
import * as ImagePicker from 'expo-image-picker'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [profile, setProfile] = useState<GateiroProfile | null>(null)
  const [name, setName] = useState('')
  const [photoUri, setPhotoUri] = useState('')

  useFocusEffect(
    useCallback(() => {
      let active = true
      loadProfile().then(data => {
        if (!active) return
        setProfile(data)
        setName(data?.name ?? '')
        setPhotoUri(data?.photoUri ?? '')
      })
      return () => {
        active = false
      }
    }, [])
  )

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    })

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri)
    }
  }

  async function handleSaveProfile() {
    if (!name.trim()) return
    const nextProfile: GateiroProfile = {
      name: name.trim(),
      photoUri: photoUri || undefined
    }
    await saveProfile(nextProfile)
    setProfile(nextProfile)
  }

  return (
    <ScreenContainer variant="list">
      <View style={{ gap: 20 }}>
        <View style={{ padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
          <Text style={[typography.subtitle, { marginBottom: 8 }]}>Perfil do gateiro</Text>
          <TextInput
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor: '#FFF'
            }}
          />
          <View style={{ height: 12 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card
              }}
            >
              <Text style={{ color: colors.primaryText }}>Selecionar foto</Text>
            </TouchableOpacity>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
            ) : null}
          </View>
          <TouchableOpacity
            onPress={handleSaveProfile}
            style={{
              marginTop: 12,
              backgroundColor: colors.primaryText,
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>Salvar perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
          <Text style={[typography.subtitle, { marginBottom: 6 }]}>Racao</Text>
          <Text style={[typography.body, { marginBottom: 8 }]}>Gerencie compras e estoque geral.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('FoodStock')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card
            }}
          >
            <Text style={{ color: colors.primaryText }}>Abrir racao</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  )
}
