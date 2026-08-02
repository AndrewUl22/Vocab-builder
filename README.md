\# VocabBuilder



React web app to build, browse and train your personal English vocabulary with interactive word training sessions.



\## Overview



VocabBuilder lets an authenticated user:



\- keep a personal dictionary of English words with progress tracking

\- browse and filter words by category and keyword

\- discover words added by other users (Recommend page) and add them to their own dictionary

\- practice learned words through interactive training sessions with a progress bar and results summary



\## Tech stack



\- \*\*React 19\*\* + \*\*Vite\*\*

\- \*\*React Router\*\* — public/private routing

\- \*\*Redux Toolkit\*\* + \*\*redux-persist\*\* — global state, auth token persisted across sessions

\- \*\*Axios\*\* — API client with auth header interceptor

\- \*\*React Hook Form\*\* + \*\*Yup\*\* — form state and validation

\- \*\*React Toastify\*\* — error/success notifications

\- \*\*MUI\*\* — progress bar and popover components



\## Backend



Public API docs: https://vocab-builder-backend.p.goit.global/api-docs/



\## Project structure



```

src/

&#x20; components/     # shared/reusable UI (Layout, PrivateRoute, RestrictedRoute, modals, etc.)

&#x20; hooks/          # useDebounce, useAuth

&#x20; pages/          # route-level pages (Register, Login, Dictionary, Recommend, Training)

&#x20; redux/          # auth / categories / words slices + async thunks

&#x20; schemas/        # Yup validation schemas

&#x20; services/       # axios instance

&#x20; styles/         # global styles

```



\## Getting started



```bash

npm install

npm run dev

```



App runs at `http://localhost:5173` by default.



\### Build



```bash

npm run build

```



\## Responsive breakpoints



\- mobile: 320px (fluid) / 375px (adaptive)

\- tablet: 768px+

\- desktop: 1440px+

