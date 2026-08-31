# 📚 VocabBuilder

A vocabulary-learning app: build your personal dictionary, discover words other users have added, and train yourself with interactive quizzes.

**Live demo:** [vocab-builder-weld.vercel.app](https://vocab-builder-weld.vercel.app)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## ✨ Features

- 🔐 **Authentication** — register, log in, and stay signed in across visits (JWT, persisted in local storage)
- 📖 **Dictionary** — a personal word list with search, category filters, and per-word learning progress
- 🌍 **Recommend** — browse words added by other users and add the ones you like to your own dictionary
- 🎯 **Training** — practice your words with a translation quiz and see your results at the end
- 👤 **Profile** — a quick overview of your account and recently added words
- 📱 **Responsive** — adapts from a 320px phone screen up through tablet and desktop layouts

## 🛠 Tech stack

- **React 19** + **Vite** — UI and build tooling
- **Redux Toolkit** — global state (auth, categories, words) with `redux-persist` for session persistence
- **React Router** — routing, with private/restricted route guards
- **React Hook Form** + **Yup** — form handling and validation
- **Axios** — API client
- **React Toastify** — notifications
- CSS Modules — component-scoped styling, no UI framework

## 🚀 Getting started

```bash
git clone <this-repo>
cd vocab-builder
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## 🔌 Backend

The app talks to a REST API for auth, words, categories, and training. The base URL is configured in `src/services/api.js`.

## 📁 Project structure

```
src/
├── components/     # reusable UI pieces (Header, WordsTable, Modal, forms, icons...)
├── pages/          # route-level pages (Dictionary, Recommend, Training, Profile, auth)
├── redux/          # Redux Toolkit slices and thunks (auth, categories, words)
├── schemas/        # Yup validation schemas
├── hooks/          # custom hooks
├── styles/         # design tokens, fonts, global styles
└── services/       # API client setup
```

## 📄 License

This project was built as a learning exercise and is not licensed for commercial use.
