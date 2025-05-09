## 📚 Project Context

- **Goal**  Create a full‑stack Next.js 14 application (React Server Components) that displays all Vibe‑Coding‑day projects, pulls project data from the Azure DevOps Wiki, and lets users vote for their favourites.
- **Deployment**  The app is built and tested in GitHub Actions and deployed to an **Azure App Service** (Linux, Node 20) using the publish‑profile secret `AZURE_WEBAPP_PUBLISH_PROFILE`.
- **Directory layout**  Source lives under `/src` using the new **`app/` router**. API routes reside in `/src/app/api/**/route.ts`.

## 🛠️ Tech Stack

| Layer       | Choice                                                          |
| ----------- | --------------------------------------------------------------- |
| UI & SSR    | Next.js 14, React 18 + Server Components                        |
| Styling     | Tailwind CSS, shadcn/ui components (Radix primitives)           |
| Data        | Azure DevOps REST API v7.1 (Wiki) • Azure Table Storage (votes) |
| ORM         | Prisma (for any relational tables)                              |
| Tests       | Jest, React Testing Library                                     |
| Lint/Format | ESLint (`next/core-web-vitals` rules) • Prettier                |

## ✍️ Coding Guidelines

- **TypeScript everywhere**; no `any` unless absolutely unavoidable.
- Use **functional React components** and hooks. Default to **Server Components**; mark client components explicitly with `"use client"`.
- Keep components small and pure; co‑locate styles (`.tsx` + `.css`) in the same folder.
- Follow the **Repository Pattern**: put data‑access abstractions in `/lib/**/*Repository.ts`.
- When building API routes: export `POST` handlers; perform **zod** schema validation for inputs and outputs.
- Implement optimistic UI updates for voting; fall back to revalidate (`router.refresh()`).

## 🔐 Security & Secrets

- Do **not** commit secrets. Use GitHub **Repository Secrets** with the prefix `AZURE_`.
- Sanitize markdown retrieved from the Wiki with `@sanity/block-content-to-react` or `marked` + DOMPurify.
- When generating sample code that accesses secrets, reference them via `process.env` and add a comment indicating they should be stored securely.

## 📊 Voting Feature

- Expose `POST /api/vote` that receives `{ projectSlug: string }`.
- Store/ increment `voteCount` in Azure Table Storage entity partitioned by `"project"` and row key = `projectSlug`.
- For demo purposes, allow anonymous voting but **throttle by IP**; include comment on how to add Azure AD authentication later.

## 🧪 Tests

- Co‑locate test files with the code under test using the pattern `*.test.ts(x)`. Aim for **≥ 80 %** statement coverage; fail CI if below.

## 📝 Git & CI

- Commit messages follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
- All new components require storybook stories (if storybook is installed) and at least one test.
- CI workflow steps: **install ➜ lint ➜ test ➜ build ➜ deploy**. Fail early on lint/test errors.

## 📄 Documentation

- Keep `README.md` concise; add deeper docs in `/docs/` and link them from the README.
- Update `/docs/ARCHITECTURE.md` after significant structural changes.

## 🤖 Copilot Style Hints

- Generate concise, self‑explanatory variable names.
- Default comments and docs to English.
- Use `import` over `require`.
- When suggesting code, prefer `async/await` and avoid `.then()` chains.
- Add JSDoc for every exported function.

---

**Remember:** When in doubt, ask the user for clarification in Copilot Chat, referencing this instruction file for context.
