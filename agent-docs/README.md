# Документация фронта для кодинг-агентов

React 18 + TypeScript + Vite + Chakra UI v2 + react-query v3 + react-router v6 + axios.
Правила репозитория — `../AGENTS.md`. Общая картина системы и предметной области —
`../../backend/agent-docs/overview.md` и `business-rules.md` там же.

| Файл | Когда читать |
|---|---|
| [frontend-architecture.md](frontend-architecture.md) | Любая правка: провайдеры, маршруты и права, API-слой, react-query, WebSocket, контексты и хуки |
| [frontend-pages-and-components.md](frontend-pages-and-components.md) | Найти страницу/компонент под задачу, повторить существующий паттерн (таблицы, модалки, флоу гравёра) |
| [frontend-conventions.md](frontend-conventions.md) | Стиль кода, импорты, даты, пагинация, фильтры магазинов, тосты, проверки перед сдачей, ловушки |

## Поддержание актуальности
Документация правится вместе с кодом: меняешь маршрут, права, query-ключ, WS-инвалидацию,
контекст или соглашение — обнови соответствующий файл в той же ветке. Нашёл расхождение доки
с кодом — исправь доку. Правила предметной области — в `backend/agent-docs/business-rules.md`.
