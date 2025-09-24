# Memory Game 🧠

A fun and interactive **Memory Game** built with **React**, **TypeScript**, and **Tailwind CSS**.  
This project demonstrates **React state management**, component design, routing, and test coverage using **Vitest**.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [Linting & Formatting](#linting--formatting)
- [Build](#build)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Start Page**:
  - Enter player name.
  - Select board size: 2x2, 4x4, 6x6, 4x5.
- **Game Page**:
  - Grid of tiles with front/back images.
  - Flippable cards with smooth animation.
  - Timer display to track game duration.
  - Tracks matched pairs and ends game when all are found.
- **End Page**:
  - Displays player's name and result.
  - Optional replay or restart.
- **Unit Tests**:
  - Vitest and Testing Library for component testing.
- **Responsive UI**:
  - Fully responsive using Tailwind CSS.

---

## Demo

> Replace these with actual screenshots or GIFs  

**Start Page:**  
![Start Page](./public/screenshots/start-page.png)

**Game Page:**  
![Game Page](./public/screenshots/game-page.png)

**End Page:**  
![End Page](./public/screenshots/end-page.png)

---

## Tech Stack

- **Frontend:** React 18 + TypeScript  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM  
- **Testing:** Vitest + Testing Library  
- **Linting & Formatting:** ESLint + Prettier  
- **Build Tool:** Vite  

---

## Project Structure

frontend-exercise/
│
├─ public/ # Static assets (images, logos, screenshots)
│
├─ src/
│ ├─ assets/ # Images and SVGs
│ ├─ components/ # Reusable UI components (Card, Timer, Modal)
│ ├─ context/ # GameContext for global state management
│ ├─ hooks/ # Custom React hooks
│ ├─ pages/ # Start, Game, and End pages
│ ├─ App.tsx # Main App component with routes
│ └─ main.tsx # Entry point
│
├─ tests/ # Optional folder for test files
├─ package.json
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts


Running the Project

Start the development server:

npm run dev
# or
yarn dev


Open http://localhost:5173
 in your browser.

You should see the Start Page.

Running Tests

Run all tests using Vitest:

npm run test
# or
yarn test


Tests are written using Vitest + Testing Library.

Linting & Formatting

Ensure consistent code style and avoid errors:

npm run lint
npm run format
# or
yarn lint
yarn format

Build

Build the project for production:

npm run build
# or
yarn build


Production-ready files will be in the dist/ folder.

Can be served using any static server.
