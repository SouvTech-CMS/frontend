# Архитектура фронта

## Загрузка приложения
`src/index.tsx` → `App` (ChakraProvider с `theme.ts`) → `AppRouter`:
`BrowserRouter` → `QueryClientProvider` → `WebSocketContextProvider` → `AuthContextProvider` →
side-маршруты (`/auth`, `/noaccess`, `/maintenance`) → `UserContextProvider` → `SearchContextProvider`
→ `PurchaseTabsContextProvider` → `PaginationContextProvider` → `Routes` внутри `AppLayout`
(сайдбар + `Outlet`; без токена редирект на `/auth`; на каждой смене маршрута дёргает
`GET /healthcheck`, при ошибке уводит на `/maintenance`).

## Маршруты и права (`src/configuration.tsx`)
`configuration.sidebarItems` — массив маршрутов `{type: main|child|side, path, component,
permissions, icon, name}`. `permissions` не задан — доступно всем, `[]` — только админу,
список — нужны **все** перечисленные права. Оборачивается `withAuthAndPermission` (`hook/`):
пока грузится пользователь — спиннер, нет прав — `/noaccess`. Страницам с таблицами
оборачивают `TableContextProvider<Filter>`, тикетам и гравировке — `TicketsContextProvider` /
`EngravingContextProvider`. `guideNotionPageId` у страницы → кнопка «?» с гайдом из Notion.
Версия в сайдбаре — `configuration.version`.

## Слой API
- `api/axiosClient.ts`: `baseURL` из `VITE_API_BASE_URL`; в каждый запрос `Authorization:
  Bearer <localStorage.token>` и `device-token`; на 401 токен стирается (редирект сделает
  `AppLayout`). Ошибка сервера в `error.response.data.detail`.
- `api/<domain>/<entity>.ts` — по функции на эндпоинт: `getAll*`, `get*ById`, `create*`,
  `update*`, `delete*`; возвращают `data`. Списки на бэке — **POST с телом**
  (`POST /order/all/`, `POST /tickets`, `POST /storage/good/all/`).
- Тело списка собирается `beautifyBody` (`util/apiRequestBody.ts`) из `ApiRequest<Filter>`:
  `limit`, `offset`, `shopId → shops: [id]` (если > 0), `sortField → sort_field`,
  `sortDirection → sort_direction`, `searchFilter → search_filter`. Ответ — `ApiResponse<T>`
  `{count, result}`. Тип `WithId<T>` добавляет `id`.
- Мутации — в `service/<domain>/*.ts`: хуки `use<Entity><Action>Mutation` на `useMutation`
  с `invalidateQueries(<ключи>)` в `onSuccess` и `notifyApiError`/`notify` в `onError`
  (не везде — при добавлении делай `onError`).

## react-query
`queryClient` с `refetchOnWindowFocus: false`, других дефолтов нет. Ключи: строки для списков
(`ordersResponse`, `storageGoodsList`, `purchasesList`, `ticketsList`, `currentUser`,
`usersList`…), кортежи для параметризованных (`["order", id]`, `["processingOrder", id]`,
`["ticketMessages", ticketId]`, `["ticketsList", searchOrderId]`). Паттерн пагинированных
таблиц: статичный ключ + `useEffect(() => refetch(), [offset, rowsPerPageCount, selectedShopId,
sortField, sortDirection, searchFilter])`. Тикеты — единственный `useInfiniteQuery`
(страницы по `TICKETS_PER_PAGE`, `getNextPageParam` по `count`).

## WebSocket-инвалидация (`context/websocket.tsx`)
Одно соединение на `VITE_WEBSOCKET_BASE_URL`, без реконнекта. Бэкенд шлёт имя очереди
(`constant/ws_queues.py` на бэке), фронт по `switch` инвалидирует ключи:
`purchase`→`purchasesList`; `purchase_delivery`→`purchaseDeliveriesList`; `supplier*`→`suppliersList`;
`file`→закупки и посылки; `comment`→**все запросы**; `order`→`ordersResponse`; `good`→`goodsResponse`;
`user`/`role`→`currentUser`,`usersList`,`rolesList`; `storage`/`storage_good`→`purchaseDeliveriesList`,
`storageGoodsList`,`storageActualInfo`; `production_info`→`goodsWithProductionInfoList`;
`table_access`→`roleTableAccess`,`userTableAccessList`; `ticket`→`ticketsList`,`ticketMessages`.
Новая очередь на бэке → добавить ветку здесь.

## Контексты (`src/context`)
| Контекст | Что держит |
|---|---|
| `auth` | `isAuthenticated` (по токену), `signIn`, `signOut` |
| `user` | `currentUser` (`GET /user/current/`), роли, права (плоский список имён), магазины, `isUserAdmin/Manager/Engraver`, `currentEngraverId`, доступ к колонкам |
| `pagination` | глобальный `rowsPerPageCount` (10/50/100) |
| `table` | generic: `sortField`, `sortDirection`, `searchFilter` для одной таблицы |
| `search` | глобальный текст поиска для карточных страниц (клиентская фильтрация) |
| `purchaseTabs` | индекс вкладки Purchases/Deliveries |
| `tickets` | открытый тикет, его сообщения и processing order |
| `engraving` | активная смена, текущий processing order, редиректы `/engraving` ↔ `/engraving/:id`, модалки перерывов и бездействия, опрос плановых перерывов каждые 10 с |
| `websocket` | только побочный эффект |

## Хуки (`src/hook`)
`usePagination` (страница/offset локально), `useShopFilter` (`selectedShopId`, 0 = все),
`useUserPermissions` (булевы `canReadOrders`, `canEditStorage`… из `constant/permissions.ts`,
имена совпадают с бэкендом), `useUserTableAccess` (колонки по ролям, только Production Info),
`useAuthorizedDevice`, `useCommentInput` (комментарии к объекту), `withAuthAndPermission`.
