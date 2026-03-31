# AGENTS.md - Agent Rules

This is an autonomous coding agent in this repo. Goals: clean, readable code and minimal diffs

## Non-negotiables

- Minimal diff: change only what the task requires. No cleanup/refactor unless asked
- Match local style: keep existing patterns, naming, imports, and formatting in touched files
- No new dependencies or toolchain/config changes without approval (see Approval Gates)
- No new top-level directories under `src/` without approval
- This repository uses only this `AGENTS.md` file as the source of agent rules

---

## Tech & basics

- Stack: React + TypeScript + Vite + Chakra UI (v2). Package manager: npm
- Branches:
  - `main` - production branch. Deployment runs from this branch via GitHub Actions
  - `dev` - main development branch
  - `<semantic-branch-name>` - feature branches created by the agent
- Commits: Conventional Commits
- Commit tags:
  - `feat:` - new functionality
  - `fix:` - bug fixes
  - `refactor:` - code changes without behavior changes or bug fixes
  - `chore:` - config/build system changes, dependency updates
  - `test:` - anything related to tests
  - `style:` - formatting-only changes without behavior changes
  - `docs:` - documentation-only changes
  - `ci:` - CI configuration changes

---

## How to Publish Changes to GitHub

1. Switch to `dev`
2. Pull the latest changes
3. Switch to a new branch with a semantic name that matches the task
4. Split changed files into logical commits and commit them
5. Push the branch to GitHub
6. Create a PR into `dev`
7. Assign the PR to the person who did the task (usually `@me`)
8. If the task is complete, add the `Ready To Merge` label (check that the label exists in the repo first)
9. Always provide the PR link
10. If the task is done, ask whether the PR can be merged

### Branch protection rule

- Direct commits/pushes/merges to `main` are forbidden
- `main` can be updated only via PR from `dev`

---

## PR Description Format

Use this template when creating a PR description:

```md
## Summary
- <what was done>
```

---

## Project structure (do not invent new layers)

Top-level layers inside `src/`:

- `api/` - API request functions
- `asset/` - static assets used by UI
- `component/` - reusable UI components
- `constant/` - shared constants and enums
- `context/` - global React Context providers + hooks
- `hook/` - reusable hooks (no JSX)
- `page/` - routed screens
- `service/` - orchestration/mutation logic over API layer
- `type/` - shared TypeScript types
- `util/` - shared helper functions
- `configuration.tsx`, `theme.ts`, `index.tsx` - app-level setup files

### Structure rules

- Put new code into existing layers and existing feature folders
- Do not create new top-level directories under `src/` without approval
- Components live as `.tsx` files inside existing feature folders; do not add barrel `index.ts` files unless that folder already uses them
- Page components should compose reusable logic from `component/`, `hook/`, `context/`, and `service/`

---

## Import rules

- Use the existing absolute imports from `src` `baseUrl` for cross-layer imports:
  - `api/*`, `asset/*`, `component/*`, `constant/*`, `context/*`, `hook/*`, `page/*`, `service/*`, `type/*`, `util/*`
- Relative imports are OK within the same feature folder
- Avoid deep relative imports that cross top-level boundaries
- Do not mass-convert import styles; match the file's existing approach

---

## Coding standards

### Components

- Arrow components with typed props:

  ```tsx
  interface ExampleProps {
    title: string
  }

  export const Example: FC<ExampleProps> = (props) => {
    const { title } = props

    return <Text>{title}</Text>
  }
  ```

- Use `FC` for components and `FCC` (from `type/fcc`) when a component accepts `children`
- For new components, accept a `props` param and destructure on the first line; if the file already destructures in the signature, keep that style
- Prefer Chakra props (`Flex`, `HStack`, `VStack` etc). Avoid custom CSS unless necessary for third-party integrations
- One primary component per file; small helper components may live in the same file

### Hooks

- Hook functions must start with `use`
- Keep hooks pure - no JSX
- No `any`. Prefer explicit types where helpful

### Comments

- Only for non-obvious intent
- Use:
  - `// NOTE:` for rationale/design
  - `// TODO:` for follow-ups
  - `// FIX:` for known bugs

---

## Approval Gates (only these require approval)

The agent MUST stop and ask for approval before doing any of the following:

### 1. Top-level structure changes

- Create/move/rename any top-level directory under `src/`
- Large restructuring: moving/renaming across layers or changing more than 5 files in a structural move

### 2. Dependencies

- Add/remove dependencies
- Change versions in `package.json` (including `devDependencies`)
- Run upgrades that modify the dependency graph (e.g. `npm update`, `npm audit fix`)
- `package-lock.json` may change only as a result of `npm install` with unchanged versions

### 3. Build/toolchain/global styling config

- Modify `tsconfig*.json`
- Modify `vite.config.*`
- Modify Chakra theme setup in `src/theme.ts` beyond small task-required edits
- Modify TS path aliases or alias-related config

Everything else (routes, contexts, pages, components, hooks) is autonomous

---

## Verification (required)

After changes, the agent MUST run:

```bash
npm install
npm run lint
npm run build
```

---

## Working style

- If a file already has a pattern, extend it instead of introducing a new one
- Avoid new abstractions/helpers unless reused at least twice within the same task
- Do not rename/move files unless the task explicitly requires it
