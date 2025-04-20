# State Management Documentation

## Redux Implementation

### Store Configuration
The application uses Redux Toolkit for efficient state management. The store is configured in two locations:

#### Main Store (src/store/index.ts)
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### State Organization

#### Authentication State
- Manages user authentication status
- Handles login/logout actions
- Stores user information
- Manages authentication tokens

#### Task State
- Manages task list and individual tasks
- Handles task creation, updates, and deletion
- Tracks task status changes
- Manages task filtering and sorting

#### Theme State
- Controls application theme (light/dark)
- Persists theme preferences
- Handles system theme detection

#### Side Menu State
- Controls side menu visibility
- Manages active menu items
- Handles responsive behavior

## Context API Usage

### ThemeContext (src/contexts/ThemeContext.tsx)
- Provides theme-related functionality
- Manages theme switching
- Handles system theme preferences
- Provides theme utility functions

### SideMenuContext (src/contexts/SideMenuContext.tsx)
- Controls side menu state
- Handles mobile responsiveness
- Manages menu interactions

### TaskContext (src/contexts/TaskContext.tsx)
- Provides task-related functionality
- Manages task form state
- Handles task filtering

## State Management Best Practices

### When to Use Redux
- Global state that many components need
- Complex state logic
- State that changes frequently
- When you need time-travel debugging

### When to Use Context
- Theme preferences
- User interface state
- Localization data
- Authentication state (when simple)

### When to Use Local State
- Form input values
- Toggle states
- UI component state
- Temporary data

## Data Flow

### Action Creation
```typescript
// Example of a typical action creator
const updateTask = createAction('tasks/updateTask')<Task>();
```

### Reducer Pattern
```typescript
// Example reducer structure
const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateTask, (state, action) => {
      // Update logic
    })
    .addCase(deleteTask, (state, action) => {
      // Delete logic
    });
});
```

### Selector Usage
```typescript
// Example selector
const selectTasks = (state: RootState) => state.tasks.items;
```

## Performance Optimization

### Memoization
- Use `useSelector` with care
- Implement `reselect` for complex selectors
- Memoize expensive calculations

### State Updates
- Avoid unnecessary updates
- Use proper normalization
- Implement proper comparison functions

## Error Handling

### Action Error Handling
- Implement proper error actions
- Handle async action errors
- Provide user feedback

### State Recovery
- Implement state persistence
- Handle network errors
- Provide fallback states

## Testing

### Redux Tests
- Test action creators
- Test reducers
- Test selectors
- Test async operations

### Context Tests
- Test context providers
- Test context consumers
- Test context updates

## Debugging

### Redux DevTools
- Time-travel debugging
- Action inspection
- State tree visualization
- Network request tracking

### Performance Monitoring
- Track render cycles
- Monitor state updates
- Analyze component re-renders