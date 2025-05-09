# Vibe Coding Jam 2025 - Development Guidelines

This document outlines the development guidelines and best practices for the Vibe Coding Jam 2025 project.

## Development Environment

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- Visual Studio Code (recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostCSS Language Support
- TypeScript Vue Plugin (Volar)

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/vibe-coding-jam.git
   cd vibe-coding-jam/projects
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid using `any` type whenever possible
- Define interfaces for all data structures in `/src/lib/types.ts`
- Use TypeScript's strict mode

### React & Next.js

- Use functional components with hooks
- Default to React Server Components for new pages
- Mark client components explicitly with `"use client"` directive
- Keep components small and focused on a single responsibility
- Co-locate related files (component, test, style) in the same directory

### CSS & Styling

- Use Tailwind CSS for styling
- Keep global styles to a minimum
- Use CSS variables for theming
- Follow the component-first approach

### State Management

- Use React's built-in state management (useState, useReducer) for simple state
- Consider using React Context for shared state
- Use server actions for form handling where possible

### File Structure

- Follow Next.js app router conventions
- Keep related code together
- Use kebab-case for file names
- Use PascalCase for component names

## Component Design

### Component Structure

```tsx
// Import statements
import { useState } from 'react';
import { SomeType } from '@/lib/types';

// Types
interface MyComponentProps {
  // Props definition
}

// Component
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Implementation
  return (
    // JSX
  );
}
```

### Best Practices

- Use named exports for components
- Break large components into smaller reusable pieces
- Avoid prop drilling by using React Context when needed
- Include JSDoc comments for all exported functions and components

## Data Access

### Repository Pattern

All data access should follow the Repository Pattern:

1. Define interfaces in `/src/lib/repositories.ts`
2. Implement concrete repositories in appropriate files
3. Use dependency injection to provide repositories to components

Example:

```typescript
// Interface
export interface ProjectRepository {
  getAllProjects(): Promise<ProjectSummary[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  incrementVote(slug: string): Promise<number>;
}

// Implementation
export class AzureProjectRepository implements ProjectRepository {
  // Implementation details
}
```

## Testing

### Unit Tests

- Write tests for all business logic
- Co-locate test files with the code under test
- Use Jest and React Testing Library
- Aim for at least 80% code coverage

### Integration Tests

- Focus on testing critical user flows
- Use Cypress for end-to-end tests
- Test the main happy paths and important edge cases

## Git Workflow

### Branch Naming

- Use the format: `type/description`
- Types: `feature`, `bugfix`, `hotfix`, `docs`, `refactor`, `test`
- Example: `feature/vote-functionality`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add vote button component
fix: correct project detail page layout
docs: update architecture documentation
refactor: improve project repository implementation
test: add tests for vote API
chore: update dependencies
```

### Pull Requests

- Create small, focused PRs
- Include a clear description of the changes
- Reference any related issues
- Request review from at least one team member
- PRs must pass CI checks before merging

## Continuous Integration

GitHub Actions will automatically:

1. Lint the code
2. Run tests
3. Build the application
4. Deploy (for main branch)

## Deployment

### Development

Automatically deployed from the `dev` branch to development environment.

### Staging

Automatically deployed from the `staging` branch to staging environment.

### Production

Automatically deployed from the `main` branch to production environment.

## Security Guidelines

- Never commit secrets or credentials
- Store all secrets in GitHub Repository Secrets
- Sanitize all user-generated content before rendering
- Implement proper input validation using zod schemas
- Follow least privilege principle for API access
