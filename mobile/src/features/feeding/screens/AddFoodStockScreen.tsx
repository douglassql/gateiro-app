import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useState } from 'react'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { useNavigation } from '@react-navigation/native'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'
import { colors } from '@/theme/colors'

export default function AddFoodStockScreen() {
  const [brand, setBrand] = useState('')
  const [quantityCurrent, setQuantityCurrent] = useState('')
  const [quantityInitial, setQuantityInitial] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [estimatedEnd, setEstimatedEnd] = useState('')
  const navigation = useNavigation()

  function handleSave() {
    if (!brand || !quantityCurrent) return

    FoodStockRepository.create({
      brand,
      quantity_current: Number(quantityCurrent),
      quantity_initial: quantityInitial ? Number(quantityInitial) : undefined,
      purchase_date: purchaseDate || undefined,
      estimated_end: estimatedEnd || undefined
    })
    navigation.goBack()
  }

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    color: colors.primaryText
  } as const

  return (
    <ScreenContainer variant="form">
      <Header icon="restaurant-outline" title="Nova compra de racao" />

      <TextInput
        placeholder="Marca da racao"
        placeholderTextColor={colors.secondaryText}
        value={brand}
        onChangeText={setBrand}
        style={inputStyle}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Quantidade atual"
        placeholderTextColor={colors.secondaryText}
        value={quantityCurrent}
        onChangeText={setQuantityCurrent}
        keyboardType="decimal-pad"
        style={inputStyle}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Quantidade inicial (opcional)"
        placeholderTextColor={colors.secondaryText}
        value={quantityInitial}
        onChangeText={setQuantityInitial}
        keyboardType="decimal-pad"
        style={inputStyle}
      />

      <View style={{ height: 8 }} />

      <DateField
        label="Data de compra (opcional)"
        value={purchaseDate}
        onChange={setPurchaseDate}
      />

      <View style={{ height: 8 }} />

      <DateField
        label="Previsao de termino (opcional)"
        value={estimatedEnd}
        onChange={setEstimatedEnd}
      />

      <View style={{ height: 12 }} />
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: colors.primaryText,
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Salvar</Text>
      </TouchableOpacity>
    </ScreenContainer>
  )
}
