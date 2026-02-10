import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

export default function AddFoodStockScreen() {
  const [brand, setBrand] = useState('')
  const [quantityCurrent, setQuantityCurrent] = useState('')
  const [quantityInitial, setQuantityInitial] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [estimatedEnd, setEstimatedEnd] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const navigation = useNavigation()
  const { pets } = usePets()

  function handleSave() {
    if (!selectedPetId || !brand || !quantityCurrent) return

    FoodStockRepository.create({
      pet_id: selectedPetId,
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
      <Header icon="restaurant-outline" title="Nova compra de racao" />

      <Text style={[typography.body, { marginBottom: 8 }]}>Selecione o pet:</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => {
          const selected = selectedPetId === item.id
          return (
            <TouchableOpacity
              onPress={() => setSelectedPetId(item.id!)}
              style={{
                padding: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected ? colors.accentPurple : colors.border,
                borderRadius: 6
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={{ height: 12 }} />

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

      <TextInput
        placeholder="Data de compra (ISO opcional)"
        value={purchaseDate}
        onChangeText={setPurchaseDate}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Previsao de termino (ISO opcional)"
        value={estimatedEnd}
        onChangeText={setEstimatedEnd}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
