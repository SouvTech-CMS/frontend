# AGENTS.md - Agent Rules (frontend)

React + TypeScript + Vite + Chakra UI v2 + react-query v3 SPA of SouvTech CMS.
Package manager: yarn. Goals: clean, readable code and minimal diffs.

## Read first (short files, pick by task)

- `agent-docs/README.md` - index of docs
- `agent-docs/frontend-architecture.md` - routing, permissions, API layer, react-query, WS
- `agent-docs/frontend-pages-and-components.md` - where pages and reusable components live
- `agent-docs/frontend-conventions.md` - style, dates, pagination, checks, gotchas
- `../backend/agent-docs/business-rules.md` - domain rules (UI language, dates, SKU…)

## Non-negotiables

- Minimal diff: change only what the task requires; no drive-by refactors or cleanups
- Match the style of the touched file; reuse existing components, hooks and patterns
- No new dependencies, no `package.json` version changes, no `tsconfig`/`vite.config`/
  `theme.ts` changes without approval; `yarn.lock` changes only with approved deps
- No new top-level directories under `src/`; no barrel `index.ts` files
- Do not rename or move files unless the task requires it
- Never commit, push, deploy or merge unless explicitly asked

## Structure (`src/`)

`api/` (requests) · `service/` (mutations over api) · `context/` · `hook/` (no JSX) ·
`component/` (feature folders) · `page/` (routed screens) · `type/` · `constant/` · `util/` ·
`asset/`; app setup in `configuration.tsx`, `theme.ts`, `index.tsx`.

## Coding standards

- Absolute imports from `src` (`api/*`, `component/*`, …); relative only inside a feature folder
- Arrow components with typed props: `export const X: FC<XProps> = (props) => { const {…} = props … }`;
  `FCC` from `type/fcc` when children are accepted; Chakra props over custom CSS
- No `any`; hooks start with `use` and contain no JSX
- Prettier config in `.prettierrc` (no semicolons, double quotes, width 80, trailing commas)
- Comments only for non-obvious intent: `// NOTE:`, `// TODO:`, `// FIX:`
- UI text in English; permissions via `useUserPermissions`, never hardcoded role checks

## Verification (required)

```bash
yarn install --frozen-lockfile
yarn run lint      # tsc --noEmit
yarn run build
npx prettier --check <changed files>
```
Then check the change in the browser against the local backend
(`../backend/agent-docs/local-dev-and-testing.md`).

## Git workflow

- `main` = production (deploy on push, only via PR from `dev`); `dev` = development
- Feature branch with a semantic name from `dev`; Conventional Commits
  (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `ci:`)
- PR into `dev`, assign to the author, label `Ready To Merge` when done; PR body:
  `## Summary` with bullets; always give the PR link; never merge yourself
