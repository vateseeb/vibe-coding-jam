# Vibe Coding Jam 2025 - API Documentation

This document outlines the API endpoints available in the Vibe Coding Jam 2025 application.

## Base URL

For local development:

```
http://localhost:3000
```

For production:

```
https://vibe-coding-jam.azurewebsites.net
```

## Authentication

Currently, the API endpoints do not require authentication. This will be implemented in a future update.

## API Endpoints

### Projects

#### `GET /api/projects`

Retrieves a list of all projects.

**Response**

```json
{
  "projects": [
    {
      "id": "1",
      "slug": "ai-image-generator",
      "title": "AI Image Generator",
      "description": "A tool that generates images from text descriptions using AI",
      "teamMembers": ["Alex Chen", "Jamie Smith", "Taylor Wong"],
      "technologies": ["React", "TypeScript", "OpenAI API", "Next.js"],
      "voteCount": 12
    }
    // ... more projects
  ]
}
```

#### `GET /api/projects/{slug}`

Retrieves details for a specific project.

**Parameters**

| Name | Required | Description               |
| ---- | -------- | ------------------------- |
| slug | Yes      | Project unique identifier |

**Response**

```json
{
  "project": {
    "id": "1",
    "slug": "ai-image-generator",
    "title": "AI Image Generator",
    "description": "A tool that generates images from text descriptions using AI",
    "imagePath": "path/to/image.jpg",
    "teamMembers": ["Alex Chen", "Jamie Smith", "Taylor Wong"],
    "technologies": ["React", "TypeScript", "OpenAI API", "Next.js"],
    "wikiUrl": "https://example.com/wiki/ai-image-generator",
    "repoUrl": "https://github.com/example/ai-image-generator",
    "demoUrl": "https://ai-image-generator.example.com",
    "createdAt": "2025-04-15T00:00:00.000Z",
    "updatedAt": "2025-05-01T00:00:00.000Z",
    "voteCount": 12
  }
}
```

**Error Responses**

- `404 Not Found`: Project with the specified slug does not exist
- `500 Internal Server Error`: Server error while fetching project

### Wiki Content

#### `GET /api/wiki/{slug}`

Retrieves wiki content for a specific project.

**Parameters**

| Name | Required | Description               |
| ---- | -------- | ------------------------- |
| slug | Yes      | Project unique identifier |

**Response**

```json
{
  "content": "# Project Name\n\n## Overview\nProject description in Markdown format..."
}
```

**Error Responses**

- `404 Not Found`: Wiki content for project not found
- `500 Internal Server Error`: Server error while fetching wiki content

### Voting

#### `POST /api/vote`

Records a vote for a specific project.

**Request Body**

```json
{
  "projectSlug": "ai-image-generator"
}
```

**Response**

```json
{
  "success": true,
  "voteCount": 13
}
```

**Error Responses**

- `400 Bad Request`: Invalid request body
- `404 Not Found`: Project with the specified slug not found
- `429 Too Many Requests`: Rate limit exceeded (IP-based throttling)
- `500 Internal Server Error`: Server error while processing vote

## Data Models

### Project Summary

```typescript
interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  teamMembers: string[];
  technologies: string[];
  voteCount: number;
}
```

### Project Detail

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imagePath?: string;
  teamMembers: string[];
  technologies: string[];
  wikiUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  voteCount: number;
}
```

## Rate Limiting

The voting API is rate-limited by IP address to prevent abuse. Users can vote once per project per hour.

## Future API Enhancements

- Authentication with Azure AD
- User-specific voting history
- Project search and filtering endpoints
- Comment and discussion endpoints
