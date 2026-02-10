export interface FoodStock {
  id?: number
  pet_id: number
  brand: string
  quantity_current: number
  quantity_initial?: number
  purchase_date?: string
  estimated_end?: string
}
