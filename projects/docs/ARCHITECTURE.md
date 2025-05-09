# Vibe Coding Jam 2025 - Architecture Overview

This document outlines the architecture of the Vibe Coding Jam 2025 application, explaining design decisions, component structure, and data flow.

## System Architecture

The Vibe Coding Jam 2025 application follows a modern full-stack architecture built on Next.js 14:

```
                 ┌─────────────────┐
                 │                 │
                 │  Next.js Server │
                 │                 │
                 └────────┬────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
┌─────────────▼─────────┐   ┌─────────▼───────────┐
│                       │   │                     │
│  React Server         │   │  API Routes         │
│  Components           │   │                     │
│                       │   │                     │
└─────────────┬─────────┘   └─────────┬───────────┘
              │                       │
              │                       │
┌─────────────▼─────────┐   ┌─────────▼───────────┐
│                       │   │                     │
│  Client Components    │   │  Data Repositories  │
│                       │   │                     │
└───────────────────────┘   └─────────┬───────────┘
                                      │
                            ┌─────────▼───────────┐
                            │                     │
                            │  External Services  │
                            │  - Azure DevOps     │
                            │  - Azure Storage    │
                            │                     │
                            └─────────────────────┘
```

## Project Structure

The application follows a clean, organized structure:

- `/src/app`: Next.js 14 app router contains all routes and API endpoints
- `/src/components`: Reusable UI components
- `/src/lib`: Core business logic including repositories and type definitions

## Key Components

### 1. Repository Layer

Following the Repository Pattern, the application abstracts data access through repository interfaces:

- `ProjectRepository`: Manages project data
- `WikiRepository`: Handles fetching content from Azure DevOps Wiki

This separation allows:

- Easy swapping between mock data and real APIs
- Centralized data access logic
- Clean testing patterns

### 2. Server Components vs. Client Components

Server Components:

- `page.tsx` files for route rendering
- Project listing and detail pages
- Initial data fetching

Client Components (marked with "use client"):

- `AnimatedBackground`: Complex animations
- `WikiContent`: Dynamic content fetching and rendering
- `VoteButton`: Interactive voting with optimistic UI updates

### 3. API Routes

- `/api/projects`: Lists all projects
- `/api/projects/[slug]`: Retrieves specific project details
- `/api/wiki/[slug]`: Fetches project wiki content
- `/api/vote`: Handles project voting

## Data Flow

1. **Project Listing Flow**:

   - Server fetches projects from ProjectRepository
   - Server renders initial HTML with project data
   - Client handles interactivity like filtering or sorting

2. **Voting Flow**:

   - Client sends vote through API route
   - Optimistic UI update shows immediate feedback
   - Real vote count stored in Azure Table Storage

3. **Wiki Content Flow**:
   - Client requests wiki content for a specific project
   - API route fetches from Azure DevOps Wiki API
   - Content is sanitized and rendered as HTML

## Security Considerations

- Markdown content from the Wiki is sanitized using DOMPurify
- API routes implement validation using zod schemas
- Vote throttling by IP address prevents abuse

## Future Enhancements

- Authentication via Azure AD
- Real-time updates with WebSockets
- Integration with Azure DevOps real-time events
- Enhanced analytics for project engagement

## Technical Debt & Challenges

- Current implementation uses mock repositories rather than real Azure services
- Optimistic UI could be further improved with React Query/SWR
- Tailwind typography plugin needs customization for better markdown rendering
