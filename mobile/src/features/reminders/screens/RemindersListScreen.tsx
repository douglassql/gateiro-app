import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { useReminders } from '../hooks/useReminders'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import FAB from '@/components/FAB'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'

export default function RemindersListScreen() {
  const { reminders, reload } = useReminders()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16 }}>{item.type} • {new Date(item.datetime).toLocaleString('pt-BR')}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditReminder', { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Excluir lembrete',
                    'Tem certeza que deseja excluir este registro?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => {
                          ReminderRepository.deleteById(item.id as number)
                          ;(reload as () => void)()
                        }
                      }
                    ]
                  )
                }}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6 }}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <FAB onPress={() => navigation.navigate('AddReminder')} />
    </View>
  )
}
