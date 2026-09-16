# Соглашения и ловушки фронта

## Код
- Импорты абсолютные от `src`: `api/…`, `component/…`, `constant/…`, `context/…`, `hook/…`,
  `page/…`, `service/…`, `type/…`, `util/…`. Плюральные алиасы из `tsconfig.paths`
  (`components/*`…) битые — не использовать. Относительные импорты запрещены eslint-правилом.
- Компоненты: `export const X: FC<XProps> = (props) => { const {…} = props; … }`, `FCC` из
  `type/fcc` для `children`; один основной компонент на файл, без barrel-файлов; Chakra-пропсы
  вместо CSS. Хуки начинаются с `use`, без `any`.
- Prettier: 2 пробела, без точек с запятой, двойные кавычки, `printWidth 80`, trailing commas.
  Комментарии `// NOTE:` (почему), `// TODO:`, `// FIX:`.

## Данные
- Даты приходят строками: `order.date` как `d.M.yyyy`, остальное ISO. Инструменты —
  `util/formatting.ts` (`dateAsStringToDate(str, isUTC)`, `formatDate`, `stringToDate`,
  `dateToDateAsString`, `timestampToDate`…) и `util/dates.ts`. Бэкенд хранит UTC, клиент в
  America/Chicago; целевой формат для клиента `MM/DD/YYYY`, 12-часовое время (CMS-задача).
- `WithId<T>` вместо `id` в базовых типах; `ApiRequest<Filter>`/`ApiResponse<T>` для запросов.
- Пагинация: `INITIAL_ROWS_PER_PAGE=10`, варианты `[10, 50, 100]`, `TICKETS_PER_PAGE=20`
  (`constant/tables.ts`); `offset = currentPage * rowsPerPageCount`.
- Фильтр магазина: `useShopFilter` → `shopId` в запросе → `shops: [id]`; опции — магазины
  текущего пользователя (`userShops`), 0 = все.
- `engraving_info` — JSON-строка вариаций Etsy; `parseEngravingInfoStr` убирает служебные
  ключи (`listing_id`, `product_id`, `transaction_type`, `OriginalSKU`), персонализация —
  `PERSONALIZATION_PARAM`; текст декодировать `he` (Etsy присылает HTML-сущности).
- Права: `constant/permissions.ts` — строки должны совпадать с бэкендом; для UI —
  `useUserPermissions().canXxx`. `constant/roles.ts` — `admin`, `manager`, `storager`, `engraver`.

## Проверки перед сдачей
```bash
yarn install --frozen-lockfile
yarn run lint      # tsc --noEmit
yarn run build     # vite build → build/
npx prettier --check <изменённые файлы>
```
Тестов нет; проверяй в браузере (dev-сервер 5173, токен в `localStorage.token`,
см. `backend/agent-docs/local-dev-and-testing.md`). В dev включён `StrictMode` — двойной запрос
при монтировании нормален.

## Ловушки
- Статичные query-ключи + ручной `refetch()` в таблицах: при добавлении параметра не забудь
  его в зависимости `useEffect`, иначе данные не обновятся.
- `PurchasesHistory` использует ключ `ordersResponse` (как `Orders`).
- WS-инвалидация `comment` сбрасывает все запросы; соединение не переподключается.
- `TicketsPanel` скрывает поиск, пока `isLoading` — для поисковых запросов держи
  `keepPreviousData`, иначе инпут размонтируется.
- Заголовок `device-token` уходит строкой `"null"`, если устройство не авторизовано.
- Гайды тянутся с `notion-api.splitbee.io` мимо `axiosClient`.
- `NotFound` не подключён к маршрутам; в `/storage` в `configuration.tsx` лишняя запятая в JSX.
