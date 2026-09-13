# Лабораторная работа №1: Настройка среды разработки и http-сервер

**Студент:** Сусло Антон

**Группа:** ПИЖ-б-о-25-2

**Вариант:** 13

**Технология:** Node.js + Express

## Содержание

**1. Цель работы:** Освоить установку инструментов для бэкенд разработки, создать и запустить минимальный веб-сервер, обрабатывающий GET-запросы, понять концепцию эндпоинтов, научиться настраивать автоматический перезапуск сервера.

**2. Теоретическое обоснование:** 
* Бэкенд (backend) - это серверная часть веб-приложения, которая отвечает за обработку запросов от клиентов, взаимодействие с базами данных, выполнение бизнес-логики и формирование ответов. Бэкенд работает на сервере и не виден пользователю напрямую.

* Веб-приложение работает с использованием клиент-серверной модели. Клиент отправляет HTTP-запрос. Сервер принимает и обрабатывает запрос и отправляет ответ.

* Эндпоинт (endpoint) - это конкретный адрес (URL) вместе с методом HTTP, по которому клиент обращается к серверу для получения ресурса.

**3. Выполнение практического примера:**
* Код сервера:
```javascript
const express = require("express");

const app = express();
const port = ("3000");

app.use ((req,res,next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req,res) => {
    res.send ('Работаем');
});

app.get("/api/status", (req, res) => {
    res.json({
        status:"ok",
        uptime: process.uptime()
    });
});

app.get("/api/info", (req, res) => {
    res.json({
        author: "Student",
        version: "1.0.0"
    });
});

app.get("/api/users/:id", (req, res) => {
    res.json({
        message: "Информация о пользователе",
        userId: req.params.id
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: "Маршрут не найден"
    });
});

app.listen(port, () => {
    console.log (`Сервер запущен на http://localhost:${port}`);
});
```

---
*Скришоты*

* **Корневой эндпоинт**

![Корневой эндпоинт](/screenshots/1.png "Корневой эндпоинт")

* **Отображение страницы status**

![Отображение страницы status](/screenshots/2.png)

* **Отображение страницы userId**

![Отображение страницы userId](/screenshots/3.png)
---
**Команды запуска:**
* node app.js

* npm run dev

## Индивидуальные задания

**Задание 1:**

- 2 эндпоинта (1 текстовый на корневом маршруте / и 1 JSON).

- Настроить автоматический перезапуск.

```javascript
const express = require ("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Документация API");
});

app.get("/api/features", (req, res) => {
    res.json({
        features: ["auth", "data"]
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
```

---
*Скриншоты*

* Endpoint /features

![Эндпоинт features](/screenshots/4.png)

---

**Задание 2:**

- 3 эндпоинта (1 текстовый на / и 2 различных JSON эндпоинта).

- Настроить автоматический перезапуск.

- Добавить кастомную обработку ошибки 404 (Not Found) с возвратом JSON формата {"error": "Not Found"}.

```javascript
const express = require ("express");

const app = express();
const port = 3000;

app.get ("/", (req, res) => {
    res.send("Список игр");
});

app.get ("/api/games", (req, res) => {
    res.json ([
        {
            id: 1,
            name: "The Elder Scrolls III: Morrowind",
            genre: "RPG"
        },
        {
            id: 2,
            name: "Diablo II",
            genre: "Action RPG"
        },
        {
            id: 3,
            name: "Hearts of Iron IV",
            genre: "Strategy"
        }
    ]);
});

app.get ("/api/platfrims", (req, res) => {
    res.json ([
        {
            id: 1,
            platform: "Xbox"
        },
        {
            id: 2,
            platform: "PC"
        },
        {
            id: 3,
            platform: "PC"
        }
    ]);
});

app.use((req,res) => {
    res.status(404).json({
        error: "Not found"
    });
});


app.listen (port, () => {
    console.log (`Сервер запущен на http://localhost:${port}`);
});
```

---
*Скриншоты*

* Endpoint /games

![Endpoint /games](/screenshots/5.png)

* Endpoint /platforms

![Endpoint /platforms](/screenshots/6.png)

* 404 not found

![404 not found](/screenshots/7.png)

---

**Задание 3:**

- 5 эндпоинтов (1 текстовый, 2 простых JSON-эндпоинта, 1 
JSON-эндпоинт с параметром в пути, 1 обработчик 404).

- Автоматический перезапуск.

- Реализация простого консольного логирования всех входящих 
запросов (метод + URL + время).

```javascript
const express = require("express");

const app = express();
const port = 3000;

app.use ((req, res, next) => {
    console.log(
        `${new Date().toISOString()} ${req.method} ${req.url}`
    );
    next();
});

app.get("/", (req,res) => {
    res.send ("Отель");
});

app.get ("/api/rooms", (req,res) => {
    res.json([
        {
            id: 1,
            number: 101,
            type: "Single"
        },
        {
            id: 2,
            number: 102,
            type: "Double"
        },
        {
            id: 3,
            number: 103,
            type: "Mnogo"
        }
    ]);
});

app.get ("/api/hotels", (req, res) => {
    res.json([
    {
        id: 1,
        name: "Hotel Six"
    },
    {
        id: 2,
        name: "Big Hotel"
    },
    {
        id: 3,
        name: "Small Hotel"
    }
    ]);
});

app.get("/api/rooms/:id", (req, res) => {
    res.json({
        requestedId: req.params.id,
        status: "success"
    });
});

app.use((req, res) => {
    res.status(404).json({
        error:"Not found"
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
```
---
*Скриншоты*

* Корневой эндпоинт

![Корневой эндпоинт](/screenshots/8.png)

* Эндпоинт /rooms

![Endpoint /rooms](/screenshots/9.png)

* Эндпоинт /hotels

![Endpoint /hotels](/screenshots/10.png)

* Эндпоинт с параметром /rooms/:id

![Эндпоинт с параметром /rooms/:id](/screenshots/11.png)

* 404 not found

![404 not found](/screenshots/7.png)

* Консольное логирование

![Консольное логирование](/screenshots/12.png)

## Ответы на контрольные вопросы:

1. *Что такое клиент-серверная архитектура?*

Клиент-серверная архитектура — это модель взаимодействия, при которой клиент отправляет запрос серверу, а сервер принимает запрос, обрабатывает его и возвращает клиенту ответ.

2. *Какой протокол используется для общения клиента и сервера в вебе?*

Для взаимодействия клиента и сервера в вебе используется протокол HTTP — HyperText Transfer Protocol. Клиент отправляет HTTP-запрос, а сервер возвращает HTTP-ответ.

3. *Что такое эндпоинт (endpoint)?*

Эндпоинт - это конкретный адрес URL вместе с HTTP-методом, по которому клиент обращается к серверу.

4. Какую структуру имеет HTTP-запрос и HTTP-ответ? Что такое код состояния?

HTTP-запрос обычно содержит: HTTP-метод, URL, заголовки. HTTP-ответ: код состояния, заголовки, тело ответа. Код состояния - числовой код, который сообщает клиенту результат обработки запроса.

5. Что такое JSON? Почему он популярен в веб-разработке?

JSON (JavaScript Object Notation) - текстовый формат представления и передачи структурированных данных. Популярен по причине простоты формата, лёгкости передачи, поддержки почти всеми современными языками программирования.

6. Как запустить сервер на Node.js или Flask?

Для node.js: run app.js

7. Что такое автоматический перезапуск сервера и зачем он нужен? Какой пакет используется для Node.js?

Автоматический перезапуск позволяет серверу самостоятельно перезапускаться после изменения исходного кода. Без него сервер приходиться перезапускать после каждого изменения. Для node.js используется пакет nodemon.

8. Какие коды состояния HTTP вы знаете? За что отвечает код 404?

400 Bad Request - Некорректный запрос.

401 Unauthorized - Требуется авторизация.

403 Forbidden - Доступ запрещён.

404 Not Found означает что запрошенный ресурс или маршрут не найден.

9. Что такое middleware в Express / декораторы запросов во Flask?

Middleware - это промежуточная функция, которая выполняется во время обработки HTTP-запроса. Такая функция может проверять логирование, авторизацию и другие запросы.

10. Как получить параметр из URL-пути, например ID пользователя?

В Express параметр маршрута обозначается через :. Например:
```javascript
app.get("/api/rooms/:id", (req, res) => {
    res.json({
        requestedId: req.params.id // 
    });
});
```
Где если будет обращение к /api/rooms/:id и вместо :id будет 10, то 

```javascript
req.params.id 
```
будет содержать 10

## Выводы:

В ходе лабораторной работы была настроена среда разработки для Node.js, установлен фреймворк Express и создан HTTP-сервер. Были изучены GET-запросы, эндпоинты, JSON-ответы, параметры URL, обработка ошибки 404 и логирование входящих запросов. Также был настроен автоматический перезапуск сервера с помощью nodemon.

---

### Использованные источники

1. **Node.js официальная документация** - https://nodejs.org/en/docs/

2. **Express официальная документация** - https://expressjs.com/

3. **HTTP протокол (MDN)** - https://developer.mozilla.org/ru/docs/Web/HTTP 

4. **JSON (MDN)** - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON










