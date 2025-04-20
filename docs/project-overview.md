# Task Management Pro - Project Documentation

## Project Overview

Task Management Pro is a React-based application that helps teams manage tasks, track progress, and collaborate effectively. This documentation is designed to help junior developers understand the project structure and React concepts used throughout the application.

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Adds static typing to JavaScript
- **contexts API**: State management solution
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and constants
├── pages/          # Route-level components
└── store/          # Legacy store (being migrated)
```

## Key Concepts

### Component Architecture

The application follows a component-based architecture where UI elements are broken down into reusable components. Components are organized in the following categories:

- **Layout Components**: `DashboardLayout`, `Layout`, `AppBar`, `SideMenu`
- **Feature Components**: `TaskCard`, `TaskForm`, `TaskStats`, `MembersTable`
- **UI Components**: Generic UI elements in the `components/ui` directory

### State Management

### Context API Usage

React Context is used for managing state that doesn't require global access:

- `ThemeContext`: Manages light/dark theme
- `SideMenuContext`: Controls side menu state
- `TaskContext`: Handles task-related state

### Routing

The application uses React Router for navigation between different pages:

- `/`: Dashboard/Home page
- `/login`: User authentication
- `/register`: New user registration
- `/profile`: User profile management
- `/settings`: Application settings
- `/statistics`: Task analytics
- `/teams`: Team management

### Custom Hooks

The application includes custom hooks to encapsulate common functionality:

- `use-mobile`: Detects mobile viewport
- `use-toast`: Manages toast notifications

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Best Practices

- Use TypeScript for type safety
- Follow component composition patterns
- Implement proper error handling
- Write clean, maintainable code
- Use meaningful component and variable names
- Keep components focused and single-responsibility
- Implement proper prop-types validation
- Use CSS modules or styled-components for styling
