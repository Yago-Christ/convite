# PROJETO X 1.0 – Festa de 18 anos

Um convite digital para festa de 18 anos com sistema de pagamentos via Pix.

## Funcionalidades

- **Página principal** com informações do evento
- **Sistema de pagamentos Pix** simulado
- **Painel administrativo** para gerenciar pagamentos
- **Design responsivo** com glassmorphism
- **Armazenamento local** usando localStorage

## Estrutura do Projeto

```
convite/
├── public/
│   ├── qr.png          # QR Code para pagamentos
│   └── vite.svg        # Ícone do Vite
├── src/
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.jsx    # Página principal
│   │   ├── Login.jsx   # Login admin
│   │   └── Admin.jsx   # Painel admin
│   ├── styles/         # Estilos CSS
│   │   └── index.css   # Estilos principais
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Ponto de entrada
├── package.json
├── vite.config.js
└── index.html
```

## Instalação e Uso

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Build para Produção

```bash
# Build do projeto
npm run build

# Visualizar build localmente
npm run preview
```

### Deploy no GitHub Pages

1. Faça o build do projeto: `npm run build`
2. Envie a pasta `dist` para o GitHub Pages
3. O projeto está configurado para funcionar com HashRouter

## Acesso Admin

- Link "admin" no canto inferior direito da página principal
- Senha: `admin123`
- Painel permite confirmar e remover pagamentos
- Atualização automática a cada 5 segundos

## Tecnologias

- **React 18** - Biblioteca frontend
- **Vite** - Build tool
- **React Router** - Navegação com HashRouter
- **CSS Puro** - Estilos com glassmorphism
- **LocalStorage** - Armazenamento de dados

## Características de Design

- Tema escuro moderno
- Efeito glassmorphism (vidro fosco)
- Design responsivo
- Animações suaves
- Tipografia moderna
