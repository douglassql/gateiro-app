import { useEffect } from 'react'
import AppNavigator from '../navigation/AppNavigator'
import { runMigrations } from '../database/migrations/init'



export default function App() {
  useEffect(() => {
    runMigrations()
  }, [])

  return <AppNavigator />
  
}
