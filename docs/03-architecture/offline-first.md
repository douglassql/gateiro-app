# Offline-First Architecture

## Princípios
- Funciona sem internet
- Dados locais como fonte de verdade
- Sincronização futura sem quebrar experiência

## Camadas
- UI: desacoplada, feedback claro de estado offline
- Data: SQLite + cache em memória
- Services: abstrações sem dependência direta de rede

## Persistência
- Tabelas locais (pets, medications, vaccines, reminders, food_stock)
- Migrações versionadas; default values e validações

## Estado
- Store leve (Context/Zustand) + queries locais
- Evitar race conditions; atualizar UI após operações sync

## Notificações
- Agendamento local com Expo Notifications (canais e permissões)
- Recalcular lembretes no start do app

## Erros e Logs
- Tratamento global de erros
- Logging leve; sem dependência de serviços externos

## Evolução para Online
- Adicionar fila de sincronização
- Estratégias de conflito (last-write-wins, merge)
- Endpoints idempotentes e contratos estáveis 
