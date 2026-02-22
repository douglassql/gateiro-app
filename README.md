# Gateiro App 🐱

Aplicativo mobile desenvolvido com **React Native** e **Expo** para ajudar donos de gatos a organizar e gerenciar a saúde, rotina e bem-estar dos seus pets.

## 📋 Sobre

O Gateiro App resolve o problema de organizar informações importantes sobre cuidados felinos em um único lugar. Com foco em simplicidade e usabilidade, o app permite gerenciar vacinas, medicamentos, alimentação e receber lembretes personalizados.

**Público-alvo:** Donos de gatos, famílias com múltiplos gatos e gateiros iniciantes.

---

## ✨ Funcionalidades MVP

### ✅ Implementadas
- [ ] Cadastro e gestão de pets
- [ ] Registro de vacinas
- [ ] Controle de medicamentos
- [ ] Lembretes básicos
- [ ] Histórico de ração
- [ ] Perfil individual do pet

### 🔮 Futuro
- Consultas veterinárias
- Eventos recorrentes avançados
- Dicas e conteúdo sobre gatos
- Backend remoto com sincronização
- Autenticação e múltiplos usuários

---

## 🛠️ Tech Stack

### Core
- **React Native** v0.81.5
- **TypeScript** v5.9
- **Expo** v54

### Estado & Forms
- **Context API** ou **Zustand** (em avaliação)
- **React Hook Form**
- **Zod** (validação)

### Banco de Dados
- **SQLite** com **expo-sqlite** (offline-first)

### UI & Navegação
- **React Navigation** (navegação de abas e stack)
- **NativeWind** (estilização)
- **Expo Vector Icons** (ícones)

### Notificações
- **Expo Notifications** (lembretes locais)

---

## 🚀 Getting Started

### Pré-requisitos
- Node.js >= 18
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd gateiro-app/mobile

# Instalar dependências
npm install
# ou
yarn install
```

### Executar

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web
```

---

## 📁 Estrutura do Projeto

```
mobile/
├── src/
│   ├── app/              # Configuração da aplicação
│   ├── components/       # Componentes reutilizáveis
│   ├── database/         # Camada SQLite
│   ├── features/         # Features do app
│   ├── navigation/       # Configuração de navegação
│   ├── screens/          # Telas da aplicação
│   ├── storage/          # AsyncStorage
│   └── theme/            # Temas e estilos
├── assets/               # Imagens e ativos
├── package.json
└── tsconfig.json
```

---

## 📚 Documentação Completa

A documentação detalhada está organizada em:

- **[Visão do Produto](docs/02-product/vision.md)** - Problema, solução e diferenciais
- **[Decisões Arquiteturais](docs/07-decisions/)** - ADRs e justificativas técnicas
- **[Arquitetura do Sistema](docs/03-architecture/system-overview.md)** - Componentes e responsabilidades
- **[Arquitetura Mobile](docs/04-mobile/)** - Tech stack, navegação, estado
- **[Modelo de Dados](docs/08-data-model/)** - Entidades e relacionamentos
- **[Plano de Implementação](docs/09-implementation-plan/)** - Fases, milestones e checklist
- **[Documentação Completa](docs/)** - Visita a pasta docs para toda a documentação

---

## 🔄 Status do Projeto

- ✅ Modelagem de domínio
- ✅ Decisões arquiteturais
- 🚧 Implementação da fase 1 (MVP)
- ⏳ Setup e ambiente

---

## 🤝 Contributing

Para contribuir com o projeto:

1. Consulte o [Definition of Done](docs/09-implementation-plan/definition-of-done.md)
2. Verifique o [Plano de Desenvolvimento](docs/09-implementation-plan/development-phases.md)
3. Siga os ADRs em [07-decisions](docs/07-decisions/)

---

## 📝 Licença

MIT (ou adicionar licença específica do projeto)

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para gatos
