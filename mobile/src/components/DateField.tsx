import { useMemo, useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'

type Mode = 'date' | 'datetime'

type Props = {
  label: string
  value?: string
  mode?: Mode
  onChange: (value: string) => void
}

function formatDate(value?: string, mode: Mode = 'date') {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  if (mode === 'datetime') {
    return date.toLocaleString('pt-BR')
  }
  return date.toLocaleDateString('pt-BR')
}

export default function DateField({ label, value, mode = 'date', onChange }: Props) {
  const [show, setShow] = useState(false)
  const [pendingDate, setPendingDate] = useState<Date | null>(null)

  const displayValue = useMemo(() => formatDate(value, mode), [value, mode])

  function handleChange(event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed') {
        setShow(false)
        setPendingDate(null)
        return
      }
    }

    if (!selected) return

    if (mode === 'datetime' && Platform.OS === 'android') {
      if (!pendingDate) {
        setPendingDate(selected)
        return
      }
      const merged = new Date(pendingDate)
      merged.setHours(selected.getHours())
      merged.setMinutes(selected.getMinutes())
      merged.setSeconds(0, 0)
      onChange(merged.toISOString())
      setPendingDate(null)
      setShow(false)
      return
    }

    onChange(selected.toISOString())
    setShow(false)
  }

  function handlePress() {
    setPendingDate(null)
    setShow(true)
  }

  const pickerMode = mode === 'datetime' && Platform.OS === 'android'
    ? (pendingDate ? 'time' : 'date')
    : mode

  return (
    <View>
      <Text style={[typography.body, { marginBottom: 6 }]}>{label}</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: colors.card
        }}
      >
        <Text style={{ color: displayValue ? colors.primaryText : colors.secondaryText }}>
          {displayValue || 'Selecionar'}
        </Text>
      </TouchableOpacity>

      {show ? (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode={pickerMode as 'date' | 'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      ) : null}
    </View>
  )
}
