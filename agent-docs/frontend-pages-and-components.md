# Страницы и ключевые компоненты

## Страницы (`src/page`)
| Путь | Страница | Что показывает |
|---|---|---|
| `/` | `Dashboard` | графики продаж по дням, штатам, городам, итоги месяца (`component/chart/*`) |
| `/orders`, `/order/:id` | `Orders`, `OrderInfo` | серверная таблица заказов с фильтрами магазина/дат/«SKU not recognized»; карточка заказа со строками |
| `/goods` | `Goods` | товары магазинов (таблица, скрытие `is_actual`) |
| `/clients`, `/client/:id` | `Clients`, `ClientDetails` | карточки типов клиентов + таблица; заказы клиента |
| `/tickets` | `Tickets` | список тикетов (бесконечная прокрутка, серверный поиск по номеру заказа) + `EngravingPanel` в режиме просмотра с чатом |
| `/engraving`, `/engraving/:id` | `OrdersForEngraving`, `Engraving` | рабочее место гравёра: поиск заказа, колонки Paused/Completed, перерывы, завершение смены; экран заказа |
| `/engravers` | `Engravers` | карточки гравёров (создание = пользователь + роль), аналитика |
| `/storage`, `/storage-good/:id` | `Storage`, `StorageGoodDetails` | склад: карточки аналитики, фильтры, таблица позиций; поставки, дефекты, закупки позиции |
| `/production-info` | `ProductionInfo` | параметры гравировки, колонки по `table_access` |
| `/shelves` | `Shelves` | зоны и полки с позициями |
| `/purchases`, `/purchases/history`, `/purchase/:id`, `/delivery/:id` | `Purchases`… | Kanban закупок и посылок, история, карточки |
| `/suppliers` | `Suppliers` | карточки поставщиков и менеджеров |
| `/reports` | `DetailedReports` | детальный отчёт за месяц + скачивание xlsx |
| `/users`, `/roles`, `/authorized-devices` | `Users`, `Roles`, `AuthorizedDevices` | сотрудники, роли с правами и доступом к колонкам, устройства |
| `/auth`, `/noaccess`, `/maintenance`, `/guide/:id` | | вход, 403, техработы, гайд из Notion (`react-notion` через splitbee) |

## Таблицы с серверной пагинацией
`component/customTable/`: `CustomTh` (сортировка asc→desc→none и поповер поиска по колонке,
пишет в `TableContext`), `SearchFiltersClearBtn`, `TableTdSkeleton`. Описание колонок —
`constant/tables.ts` (`ORDERS_TABLE_COLUMNS`…, `null` = колонка действий). Пагинация —
`component/page/Pagination.tsx` + `RowsPerPageSelect`. Образец страницы — `page/Orders.tsx`.

## Модалки и карточки
`type/modalProps.ts` (`isOpen`, `onClose`, `isReadOnly?`); открываются `useDisclosure` из
`New*Btn`/`*CardMenu`; фон `ModalBackgroundBlur`; сохранение через хук из `service/` и
`notify(...)`. Канонический пример — `component/storage/StorageModal.tsx`. Карточные страницы
(`Users`, `Roles`, `Suppliers`, `Engravers`, `Devices`) фильтруются на клиенте по `SearchContext`.

## Флоу гравёра (`component/orderProcessing`, `workShift`, `workBreak`, `engraver`)
`EngravingPanel` = детали заказа (`ProcessingOrderDetails`, `ProcessingGood` с
`engraving_info` через `util/engravingInfo.ts` и `he.decode`) + кнопки
`ProcessingOrderButtons` (`FinishBtn`→`Finished`, `PauseBtn`→`Paused`, `TakeBreakBtn`,
`BackBtn` в просмотре) + `TicketChat`. Вход заказа: `FindOrderColumn` + `OrderIdSearchInput`
(≥10 символов) → `OrderToEngravingCard` → мутация создания processing order. Смена:
`WorkShiftStart`/`WorkShiftFinishBtn`; перерывы: `ActiveWorkBreakModal`,
`ActiveScheduledBreakModal`; бездействие: `InactivityModal` (10 минут). Статусы —
`constant/orderStatus.ts`.

## Общие элементы
`Page` (обёртка + кнопка гайда), `PageHeading` (`HeadingBtns`: поиск, уведомления,
профиль), `Container` (белая карточка), `LoadingPage`, `CollapsibleCardsGrid`, `CustomTooltip`,
`component/filter/*` (магазин, даты, месяц, год), `component/select/*`, `component/badge/*`,
тосты `util/toasts.tsx` (`notify`, `notifyApiError`).
