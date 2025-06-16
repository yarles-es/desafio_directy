# ⏱️ Projeto Contador de Tempo - Desafio Directy

Este projeto foi desenvolvido como parte de um desafio técnico da empresa **Directy**. Trata-se de um sistema de contagem de tempo, com interface moderna e responsiva, onde os registros são salvos no backend e listados em uma tabela com opções de edição e exclusão.

---

## 🗂 Estrutura do Projeto

O repositório contém duas pastas principais:
 - front_end # Aplicação React com TailwindCSS e React Query
 - back_end # API Node.js com Express, Prisma e SQLite

## 🚀 Tecnologias Utilizadas

### Front-end

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/) (para animações)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (alertas)

### Back-end

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS Middleware](https://www.npmjs.com/package/cors)

## 📦 Instalação

### Pré-requisitos

- Node.js v18+
- pnpm / npm / yarn (de sua preferência)

### 1. Clone o projeto

```bash
git clone https://github.com/yarles-es/desafio_directy
cd nome-do-repositorio
cd back_end
npm install
npm run dev
# Abra um novo terminal e vá para a pasta front_end:
cd ../front_end
npm install
npm run dev
```

---

## ✨ Funcionalidades

- ⏱ **Contador de Tempo**: Inicie e pare a contagem em tempo real com um clique.
- 💾 **Salvamento de Registros**: Ao finalizar a contagem, os dados são salvos automaticamente no banco.
- 📄 **Listagem de Registros**: Visualize todos os registros salvos em uma tabela organizada.
- ✏ **Edição de Registros**: Altere a data de criação de um registro existente.
- 🗑 **Exclusão de Registros**: Remova registros da base de dados com um clique.
- 📋 **Ordenação Dinâmica**: Reordene a tabela por ID, tempo ou data de criação.
- ✅ **Alertas Visuais**: Receba feedbacks imediatos com notificações personalizadas via toast.
- 💅 **Design Responsivo e Moderno**: Interface construída com TailwindCSS v4 para uma experiência fluida em qualquer dispositivo.

