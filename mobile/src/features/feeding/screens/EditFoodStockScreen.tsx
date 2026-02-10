import { View, TextInput, Button, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { useNavigation, useRoute } from '@react-navigation/native'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

type RouteParams = {
  id: number
}

export default function EditFoodStockScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = (route.params as unknown as RouteParams)

  const [brand, setBrand] = useState('')
  const [quantityCurrent, setQuantityCurrent] = useState('')
  const [quantityInitial, setQuantityInitial] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [estimatedEnd, setEstimatedEnd] = useState('')

  useEffect(() => {
    const item = FoodStockRepository.findById(id)
    if (item) {
      setBrand(item.brand)
      setQuantityCurrent(String(item.quantity_current))
      setQuantityInitial(item.quantity_initial != null ? String(item.quantity_initial) : '')
      setPurchaseDate(item.purchase_date ?? '')
      setEstimatedEnd(item.estimated_end ?? '')
    }
  }, [id])

  function handleSave() {
    if (!brand || !quantityCurrent) return

    FoodStockRepository.update({
      id,
      brand,
      quantity_current: Number(quantityCurrent),
      quantity_initial: quantityInitial ? Number(quantityInitial) : undefined,
      purchase_date: purchaseDate || undefined,
      estimated_end: estimatedEnd || undefined
    })
    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="restaurant-outline" title="Editar estoque" />

      <TextInput
        placeholder="Marca da racao"
        value={brand}
        onChangeText={setBrand}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Quantidade atual"
        value={quantityCurrent}
        onChangeText={setQuantityCurrent}
        keyboardType="decimal-pad"
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Quantidade inicial (opcional)"
        value={quantityInitial}
        onChangeText={setQuantityInitial}
        keyboardType="decimal-pad"
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
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
