# Занятие 31-32. React Query

## React Query

React Query - библиотека для получения, кэширования, синхронизации и обновления "серверного" состояния в React-приложениях.

### Установка

```bash
yarn add react-query
# или
npm i react-query
```

### Быстрый старт

Ключевыми концепциями React Query являются:

- Запросы (queries)
- Мутации (mutations)
- Кэширование запроса
- Инвалидация запроса и его кэша (аннулирование, признание недействительным)

#### Запросы

Это обычные запросы на сервер типа `GET` для получения какой-то информации.

Прелесть запросов через react-query состоит в том, что:

- библиотека сама умеет отслеживать состояние запроса и сообщать об этом,
- сама умеет по предлагаемым правилам/причинам делать перезапрос (например, истек тайм-аут ожидания ответа или нужно еще раз спросить сервер, не поменялись ли данные)

Как это работает на примере.

Предположим есть какой-то компонент, который рисует полученные данные в виде списка. В обычной реализации через `fetch/axios` это было бы так.

```tsx
import useState from 'react';
import useEffect from 'react';
import React from 'react';

const urlToGetdata = 'httpsl://url/to/fetch/data/from';

const Component = () => {
  // создаем state для хранения ответа, индикации загрузки и ошибки
  const [data, setData] = useState<Array<string> | undefined>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ code: number; message: string } | null>(
    null
  );

  // создаем переменную, которая будет выполнять запрос на сервер
  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(urlToGetdata);

      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // создаем useEffect, который бы в начале начинал загрузку данных с сервера
  useEffect(() => {
    loadData();
  }, []);

  // если загрузка, то показываем индикатор
  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  // если ошибка, то показываем ошибку
  if (error) {
    return <div>`Ошибка загрузки данных: ${error.message}`</div>;
  }

  // в ином случае рисуем данные в компоненте
  return <div>{data?.map((dataItem) => <div>{dataItem}</div>)}</div>;
};

export { Component };
```

В этом примере есть целых три `useState`, есть своя обработка ошибки через `try/catch` и слежение за состоянием загрузки данных через `loading/setLoading`.

В реакт-квери можно несколько все упростить:

Появляется функция запроса для упрощения

```tsx
// появляется функция запроса для упрощения
const getData = async () => {
  const data = await fetch(urlToGetdata);

  return data;
};
```

Делаем запрос к источнику данных через хук `useQuery`:

```tsx
// создаем запрос через реакт квери и достаем из резултата статус загрузки, результат и ошибку
const { isLoading, error, data } = useQuery('repoData', getData);
```

Все вместе будет выглядеть так:

```tsx
import useState from 'react';
import useEffect from 'react';
import React from 'react';
import { useQuery } from 'react-query';

const urlToGetdata = 'httpsl://url/to/fetch/data/from';

// появляется функция запроса для упрощения
const getData = async () => {
  const data = await fetch(urlToGetdata);

  return data;
};

const Component = () => {
  // создаем запрос через реакт квери и достаем из резултата статус загрузки, результат и ошибку
  const { isLoading, error, data } = useQuery('repoData', getData);

  // если загрузка, то показываем индикатор
  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  // если ошибка, то показываем ошибку
  if (error) {
    return <div>`Ошибка загрузки данных: ${error.message}`</div>;
  }

  // в ином случае рисуем данные в компоненте
  return (
    <div>
      {data?.map((dataItem, index) => <div key={index}>{dataItem}</div>)}
    </div>
  );
};

export { Component };
```

Результаты запроса, возвращаемые useQuery, содержат всю необходимую информацию о запросе.

```tsx
const result = useQuery('todos', fetchTodos);
```

Объект `result` содержит несколько важных состояний (states). Запрос может находиться в одном из следующих состояний:

- `isLoading` или `status === 'loading'` - запрос находится на стадии выполнения, данные еще не получены
- `isError` или `status === 'error'` - запрос завершился ошибкой
- `isSuccess` или `status === 'success'` - запрос завершился успешно, данные доступны
- `isIdle` или `status === 'idle'` - запрос отключен

Кроме того, объект `result` содержит следующую информацию:

- `error` - если запрос находится в состоянии `isError`, ошибка доступна через свойство `error`
- `data` - если запрос находится в состоянии `success`, данные доступны через свойство `data`
- `isFetching` - в любом состоянии, если запрос находится на стадии выполнения (включая фоновый повторный запрос) `isFetching` будет иметь значение `true`

#### Ключи и параметры запросы

`React Query` осуществляет кэширование запросов на основе ключей. Ключи могут быть любыми уникальными сериализуемыми значениями (строками, массивами, объектами и т.д.).

Если функция запроса использует переменную, такая переменная должна включаться в ключ запроса:

```tsx
function Todos({ todoId }) {
  const result = useQuery(['todos', todoId], () => fetchTodoById(todoId));
}
```

#### Что такое функции запроса

Функция запроса может быть любой функцией, возвращающей промис, который, в свою очередь, должен либо разрешаться данными, либо выбрасывать исключение:

```tsx
useQuery(['todos', todoId], fetchTodoById);
useQuery(['todos', todoId], () => fetchTodoById(todoId));
useQuery(['todos', todoId], async () => {
  const data = await fetchTodoById(todoId);
  return data;
});
```

При необходимости, в функции запроса можно получить доступ к переменным, указанным в ключе запроса:

```tsx
function Todos({ status, page }) {
  const result = useQuery(['todos', { status, page }], fetchTodoList);
}

// Получаем переменные `key`, `status` и `page` в функции запроса
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey;
  return new Promise();
}
```

##### Обработка ошибок

При возникновении ошибки, функция запроса должна выбрасывать исключение, которое сохраняется в состоянии error запроса:

```tsx
const { data, error } = useQuery(['todos', todoId], async () => {
  const response = await fetch('/todos/' + todoId);

  if (!response.ok) {
    throw new Error('Что-то пошло не так');
  }

  return await response.json();
});
```

#### Использование объекта вместо параметров

Для настройки запроса можно использовать объект:

```tsx
import { useQuery } from 'react-query';

useQuery({
  queryKey: ['todo', 5],
  queryFn: fetchTodo,
  ...config,
});
```

#### Отключение/приостановка выполнения запросов

Для отключения автоматического выполнения запроса используется настройка enabled.

При установка значения данной настройки в false:

- Если запрос имеет кэшированные данные
  - Запрос будет инициализирован в состоянии status === 'success' или isSuccess
- Если запрос не имеет таких данных
  - Запрос бует запущен в состоянии status === 'idle' или isIdle
  - Запрос не будет автоматически выполняться при монтировании
  - Запрос не будет автоматически выполняться повторно при монтировании или появлении нового экземпляра
  - Запрос будет игнорировать вызовы invalidateQueries и refetchQueries на клиенте запроса (query client), обычно, приводящие к выполнению повторного запроса
  - Для ручного выполнения запроса может быть использован метод refetch

```tsx
function Todos() {
  const { isIdle, isLoading, isError, data, error, refetch, isFetching } =
    useQuery('todos', fetchTodoList, {
      enabled: false,
    });

  return (
    <>
      <button onClick={() => refetch()}>Получить задачи</button>

      {isIdle ? (
        <span>Не готов...</span>
      ) : isLoading ? (
        <span>Загрузка...</span>
      ) : isError ? (
        <span>Ошибка: {error.message}</span>
      ) : (
        <>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
          <div>{isFetching ? 'Выполнение запроса...' : null}</div>
        </>
      )}
    </>
  );
}
```

#### Как сохранить данные в кэше

React Query осуществляет кэширование запросов на основе ключей. Ключи могут быть любыми уникальными сериализуемыми значениями (строками, массивами, объектами и т.д.).

#### Повторение запросов

Выполнение повторного запроса при фокусировке на окне¶
Если пользователь покидает приложение и возвращается к устаревшим данным, React Query автоматически запрашивает свежие данные в фоновом режиме. Это поведение можно отключить глобально или в отношении конкретного запроса с помощью настройки refetchOnWindowFocus.

Глобальное отключение:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

Параметр `refetchInterval`:

Можно воспользоваться настройкой `refetchInterval`. Принимает функцию, которая возвращает `false` или число.

```tsx
const queryClient = new QueryClient({
  'queryKey',
  queryFn, {

    refetchInterval: (data) => {
      // если получили ожидаемые данные, то возвращаем `false`
      if (data.status === 'status') {
        return false
    }

    // refetch interval in miliseconds
    return 5000;
    }
  }
});
```

#### Мутации

В отличие от запросов, мутации, обычно, используются для создания/обновления/удаления данных или для выполнения побочных эффектов на сервере. Для этого используется хук useMutation.

Если метод `изменяет` данные на сервере, то лучше использовать мутации.

Чтобы совершить мутацию данных, нужно воспользоваться хуком `useMutation`.
Хук `useMutation` так же принимает функцию, с помощью которой нужно выполнить запрос:

```tsx
const requestFn = ({ id, requestPayload }) => {
  const { data } = await post('url/to/make/request/to', requestPayload);

  return data;
};

const mutation = useMutation(requestFn);
```

Мутация может находиться в одном из следующих состояний:

- `isIdle` или `status === 'idle'` - мутация находится в режиме ожидания или на стадии обновления/сброса
- `isLoading` или `status === 'loading'` - мутация выполняется
- `isError` или `status === 'error'` - при выполнении мутации возникла ошибка
- `isSuccess` или `status === 'success'` - мутация выполнена успешно, данные доступны

Также, в зависимости от состояния мутации, доступна дополнительная информация:

`error` - если мутация находится в состоянии `isError`, ошибка доступна через свойство `error` `data` - если мутация находится в состоянии `success`, данные доступны через свойство `data`
Функция `mutate` принимает переменную или объект.

Функция `mutate` принимает переменную или объект, то есть из примера выше следует:

```tsx
// 1. Достаем из объекта мутации isLoading, mutate
// 2. Вызываем мутацию с параметрами, которые требует функция мутации, а именно `requestFn`

const { mutate, isLoading } = useMutation(requestFn);

const handleSubmit = () => {
  mutate({
    id: 'id-1',
    requestPayload: {
      name: 'sport-complex-1',
      hasPool: true,
    },
  });
};
```

#### Побочные эффекты мутации

`useMutation` содержит некоторые утилиты, позволяющие выполнять побочные эффекты на любой стадии жизненного цикла мутации. Это может быть полезным как для инвалидации и повторного выполнения запроса после мутации, так и для оптимистического обновления:

```tsx
useMutation(addTodo, {
  onMutate: (vars) => {
    // Произошла мутация

    // Опционально, можно вернуть контекст с данными, которые могут использоваться при отмене изменений, например
    return { id: 1 };
  },
  onError: (error, vars, context) => {
    // Возникла ошибка
    console.log(
      `Отмена изменений для оптимистического обновления с id ${context.id}`
    );
  },
  onSuccess: (data, vars, context) => {
    // Мутация выполнена успешно
  },
  onSettled: (data, error, vars, context) => {
    // Ошибка или успех... неважно
  },
});
```

При возвращении промиса из любого колбека, следующий промис будет ждать разрешения предыдущего:

```tsx
useMutation(addTodo, {
  onSuccess: async () => {
    console.log('Первый!');
  },
  onSettled: async () => {
    console.log('Второй!');
  },
});
```

#### Промисы

Помито того, что в объекте мутации есть `mutate`, есть еще `mutateAsync`. В таком случае, обработку ошибок нужно будет выполнять через блок `try/catch`.

```tsx
try {
  const data = mutateAsync(payload);

  // some actions with `data`
} catch (error) {
  console.error('Ooops, there is an error', error);

  // some actions with `error`
}
```

#### Повторное выполнение мутации

По умолчанию `React Query` не запускает повторное выполнение мутации при возникновении ошибки, но это можно изменить с помощью настройки `retry`:

```tsx
const mutation = useMutation(addTodo, {
  retry: 3,
});
```

#### Инвалидация запросов

Метод `invalidateQueries` клиента запроса позволяет помечать запроса как устаревшие и потенциально выполнять повторное получение данных:

```tsx
// Инвалидация всех запросов, находящихся в кэше
queryClient.invalidateQueries();
// Инвалидация всех запросов, ключи которых начинаются с `todos`
queryClient.invalidateQueries('todos');
```

При инвалидации запроса с помощью `invalidateQueries` происходит две вещи:

- Он помечается как устаревший. При этом, настройка `staleTime` в `useQuery` и других хуках перезаписывается
- Если запрос отрендерен с помощью `useQuery` или других хуков, он выполняется повторно в фоновом режиме

#### Инвалидация запросов с помощью мутаций¶

Инвалидация запросов - это половина успеха. Вторая половина - знать, когда их следует аннулировать. Обычно, при выполнении мутации, связанные с ней запросы нуждаются в инвалидации и повторном выполнении.

Предположим, что у нас имеется мутация для добавления новой задачи:

```tsx
const mutation = useMutation(postTodo);
```

После выполнении мутации `postTodo`, нам требуется аннулировать все запросы с ключом `todos` и выполнить их повторно для отображения новой задачи. Для этого мы можем использовать настройку `onSuccess` и функцию `invalidateQueries`:

```tsx
import { useMutation, useQueryClient } from 'react-query';

const queryClient = useQueryClient();

// Аннулируем все запросы с ключами `todos` и `reminders` после выполнения мутации
const mutation = useMutation(addTodo, {
  onSuccess: () => {
    queryClient.invalidateQueries('todos');
    queryClient.invalidateQueries('reminders');
  },
});
```

Инвалидация может выполняться в любом колбеке хука `useMutation`.
