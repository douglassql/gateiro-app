import { Text, View } from 'react-native'

type Props = {
  label: string
}

export default function Chip({ label }: Props) {
  return (
    <View style={{
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 14,
      backgroundColor: '#D8C5DD',
      marginRight: 6,
      marginBottom: 6
    }}>
      <Text style={{ color: '#3C2C2C' }}>{label}</Text>
    </View>
  )
}
