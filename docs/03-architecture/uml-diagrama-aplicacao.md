# UML da Aplicação (Componentes)

Este diagrama representa a arquitetura principal do Gateiro App no MVP, com foco em mobile local-first e evolução futura para backend.

```mermaid
classDiagram
    direction LR

    class MobileApp {
      <<Component>>
      +stack: React Native
      +language: TypeScript
    }

    class UI {
      <<Component>>
      +screens: Screen[]
      +components: Component[]
    }

    class Navigation {
      <<Component>>
      +stackNavigator: boolean
      +bottomTabs: boolean
    }

    class Features {
      <<Component>>
      +pets: boolean
      +health: boolean
      +feeding: boolean
      +reminders: boolean
      +content: boolean
    }

    class StateStore {
      <<Component>>
      +strategy: Context API
      +futureStrategy: Zustand
    }

    class Services {
      <<Component>>
      +businessRules: boolean
      +useCases: boolean
    }

    class LocalDB {
      <<Database>>
      +engine: SQLite
      +tables: pets,vaccines,medications,reminders,food_stock,articles
    }

    class NotificationEngine {
      <<Component>>
      +provider: Expo Notifications
      +localScheduling: boolean
    }

    class SyncQueue {
      <<Component>>
      +enabledInMVP: false
    }

    class BackendAPI {
      <<External>>
      +type: REST API
      +enabledInMVP: false
    }

    MobileApp --> UI : renderiza
    MobileApp --> Navigation : controla rotas
    MobileApp --> StateStore : mantém estado global

    UI --> Features : aciona fluxos
    Features --> Services : executa ações
    StateStore --> Services : leitura/escrita

    Services --> LocalDB : CRUD local
    Services --> NotificationEngine : agenda lembretes
    NotificationEngine --> LocalDB : lê reminders no start

    Services ..> SyncQueue : evolução online
    SyncQueue ..> BackendAPI : sincroniza dados
```

## Observações

- Fonte de verdade no MVP: `LocalDB (SQLite)`.
- O `BackendAPI` não é obrigatório para a versão inicial.
- A sincronização (`SyncQueue`) é uma camada de evolução, sem quebrar o modo offline-first.
