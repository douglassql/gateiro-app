# UML da Aplicação (Componentes)

Este diagrama representa a arquitetura principal do Gateiro App no MVP, com foco em mobile local-first e evolução futura para backend.

```mermaid
classDiagram
    direction LR

    class MobileApp {
      <<component>>
      React Native + TypeScript
    }

    class UI {
      <<component>>
      Screens e Components
    }

    class Navigation {
      <<component>>
      Stack + Tabs
    }

    class Features {
      <<component>>
      pets, health, feeding,
      reminders, content
    }

    class StateStore {
      <<component>>
      Context API / Zustand (futuro)
    }

    class Services {
      <<component>>
      Regras de negócio
      Casos de uso
    }

    class LocalDB {
      <<database>>
      SQLite
      pets, vaccines,
      medications, reminders,
      food_stock, articles
    }

    class NotificationEngine {
      <<component>>
      Expo Notifications
      agendamento local
    }

    class SyncQueue {
      <<component>>
      fila de sincronização
      (futuro)
    }

    class BackendAPI {
      <<external>>
      API REST (futuro)
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
