# Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It appears to be a web application designed for practicing front-end interviews. The project uses a Feature-Sliced Design (FSD) architecture, which is a structured approach for organizing code in a scalable way.

The core functionality of the application is to provide interview questions on various front-end technologies (e.g., JavaScript, React, TypeScript) and then use a generative AI model to provide feedback on the user's answers.

## Key Technologies

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **AI:** Google Generative AI
*   **Linting:** ESLint

## Architecture

The project follows the Feature-Sliced Design (FSD) methodology. The `fsd` directory contains the main application code, which is organized into the following layers:

*   `features`: Contains specific application features, such as the chat interface and multiple-choice interview components.
*   `pages`: Contains the main pages of the application, such as the interview page.
*   `shared`: Contains shared components, libraries, and models that are used across the application.
*   `widgets`: Contains larger, more complex UI components that are composed of smaller features and shared components.

The application also includes API routes in the `app/api` directory for handling server-side logic, such as generating feedback and interpreting answers using the Google Generative AI model.

# Building and Running

To get the development server running, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

*   `dev`: Runs the development server with Turbopack.
*   `build`: Builds the application for production with Turbopack.
*   `start`: Starts the production server.
*   `lint`: Runs the ESLint linter.

# Development Conventions

*   **Coding Style:** The project uses ESLint to enforce a consistent coding style. The specific rules are defined in the `eslint.config.mjs` file.
*   **Testing:** There are no explicit testing practices or frameworks evident in the project structure.
*   **Contribution:** There are no contribution guidelines specified in the project.
