import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import Ionicons from '@expo/vector-icons/Ionicons'

type CatFact = {
  id: string
  fact: string
  length: number
}

export default function CatFactsScreen() {
  const [facts, setFacts] = useState<CatFact[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [translateNotice, setTranslateNotice] = useState<string | null>(null)

  const translateText = useCallback(async (text: string) => {
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'pt',
          format: 'text'
        })
      })

      if (!res.ok) {
        return null
      }

      const data = (await res.json()) as { translatedText?: string }
      return data.translatedText?.trim() || null
    } catch {
      return null
    }
  }, [])

  const fetchFact = useCallback(async () => {
    setLoading(true)
    setError(null)
    setTranslateNotice(null)
    try {
      const res = await fetch('https://catfact.ninja/fact')
      if (!res.ok) {
        throw new Error('Falha ao buscar fatos')
      }
      const data = (await res.json()) as { fact: string; length: number }
      const translated = await translateText(data.fact)
      const factText = translated || data.fact

      if (!translated) {
        setTranslateNotice('Nao foi possivel traduzir, exibindo em ingles.')
      }

      setFacts(prev => [
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          fact: factText,
          length: data.length
        },
        ...prev
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao buscar fatos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFact()
  }, [fetchFact])

  return (
    <ScreenContainer variant="list">
      <Header icon="paw-outline" title="Fatos de gatos" />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity
          onPress={fetchFact}
          disabled={loading}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            marginRight: 8
          }}
        >
          <Text style={{ color: colors.primaryText }}>{loading ? 'Buscando...' : 'Buscar novo fato'}</Text>
        </TouchableOpacity>
        <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 12,
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: colors.border
          }}
        >
          <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
            Total: {facts.length}
          </Text>
        </View>
      </View>

      {error ? (
        <View
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card
          }}
        >
          <Text style={{ color: colors.secondaryText }}>{error}</Text>
        </View>
      ) : null}

      {translateNotice ? (
        <View
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card
          }}
        >
          <Text style={{ color: colors.secondaryText }}>{translateNotice}</Text>
        </View>
      ) : null}

      <FlatList
        data={facts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              marginBottom: 12
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: 4,
                  borderRadius: 4,
                  backgroundColor: colors.accentPurple,
                  marginRight: 10
                }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                    <Ionicons name="paw-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={2}>
                      Fato
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 12,
                      backgroundColor: '#FFF',
                      borderWidth: 1,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ color: colors.secondaryText, fontSize: 12 }}>{item.length} chars</Text>
                  </View>
                </View>
                <Text style={[typography.body, { marginTop: 8 }]}>{item.fact}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card
            }}
          >
            <Text style={typography.body}>Nenhum fato encontrado.</Text>
          </View>
        }
      />
    </ScreenContainer>
  )
}
