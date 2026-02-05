# Build Android Offline (APK)

## Objetivo
- Gerar um APK do Gateiro App para rodar no Android sem backend (offline-first).

## Pré-requisitos
- Node 18+
- Java JDK 17
- Android SDK e emulador (opcional para testes)
- Variáveis de ambiente configuradas (JAVA_HOME, ANDROID_HOME, PATH)

## Opção A — EAS Build
### Cloud
- Instalar CLI: `npm i -D eas-cli`
- Configurar: `npx eas build:configure`
- Build: `npx eas build -p android --profile production`
### Local
- Pré-instalar Android SDK
- Build local: `npx eas build -p android --profile production --local`

## Opção B — Expo Prebuild + Gradle (local)
- Prebuild: `npx expo prebuild`
- Abrir `android/` e gerar release:
  - Windows: `cd android && .\\gradlew assembleRelease`
  - Saída: `android/app/build/outputs/apk/release/app-release.apk`

## Assinatura
- EAS: gerencia keystore automaticamente (cloud) ou local via prompts
- Gradle: configurar `signingConfigs` e `release` no `build.gradle`

## Configurações recomendadas
- `app.json`:
  - `android.edgeToEdgeEnabled: true`
  - `newArchEnabled: true`
- Notificações: canais e permissões via Expo Notifications
- Storage: SQLite local para dados

## Testes Offline
- Desativar internet no device/emulador
- Navegar pelo app e validar:
  - CRUD local de pets, medicamentos e vacinas
  - Gatilho de notificações locais
  - Persistência após fechar e reabrir o app

## Dicas
- Usar `release` para testar performance e permissões
- Evitar chamadas de rede; tratar falhas com mensagens amigáveis
- Logar erros localmente sem bloquear o fluxo de uso 
