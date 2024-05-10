# Занятие 23-24: Redux

> Disclamer
> Документация тут – https://ru.react-redux.js.org/

## С какой целью использовать React Redux?

### Мотивация (написано в документации)

Приложение растет, приходитмя поддерживать больше состояний чем ранее.

Приложению может требоваться сохранять ответ от сервера или кешировать какие-то данные, которые в будущем будут отправлены на сервер.

Так же стремительно растет сложность UI, в котором нужно следить за роутами, пагинацией, крутилками при загрузке контента и так далее.

Управлять большим состоянием становится трудно.
Если одни данные могут обновить другие данные, представление может обновить данные, что в свою очередь может обновить что-то другое, что повлечет обновление интерфейса в третьем месте.

Со временем хаотичных и связных обновлений становится все больше и больше, и в какой-то момент теряется понимание о том, что в какой момент и каким образом будет обновлено.

#### Если обобщить

`Redux` позволяет сложить общие данные, которые нужны в разных участках системы, таким образом, чтобы эти участки системы были друг от друга изолированы, но имели доступ к одному общему хранилищу данных.

> Например, данные пользователя, справочники. сохраненные локально в общий `store`, глобальная индикация.

(!!! Важно)
Систему можно создавать и без Redux, не нужно стремиться положить в него абсолютно все и сразу.

## Составные части Readux

1. Состояние/хранилище/стор/store
2. Действие/action
3. Dispatcher/отправка действий для обработки
4. Редьюсер/reducer

### Состояние/хранилище/стор/store

Это объект, который хранит состояние приложения,

```tsx
const state = {
  user: {
    name: 'Kazimir',
    lastName: 'Presnov',
  },
  isLogined: true,
};
```

### Действие/action

Это событие, которое будет менять состояние приложения.
Действие несет в себе какую-то информацию – payload –, которая понадобится для изменения состояния.
Действие может быть с пустым `payload`.

Возвращается объект с атрибутами `payload`, `actionType`.

```tsx
// payload is USER
const setUser = (user) => {
  return {
    payload: user,
    actionType: 'SET_USER',
  };
};
```

```tsx
// no payload
const setUserLoggedIn = () => {
  return {
    actionType: 'REMOVE_USER',
  };
};
```

### Dispatcher/отправка действий для обработки

Это механизм, который предоставляет сама библиотека, для отправки событий для последующей обработки

```tsx
const dispatch = useDispatch();

dispatch(
  setUser({
    name: 'Kazimir',
    lastName: 'Presnov',
  })
);
```

### Редьюсер/reducer

Редьюсер – это функция, которая ловит события, отправленные через dispatch и что-то с этими событиями делает.
Редьюсер принимает два параметра: `state` и `action`.

```tsx
const initialState = {
  user: null,
  isLoginned: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      const { payload } = action;

      return {
        ...state,
        name: payload.name,
        lastName: payload.lastName,
        isLoggined: true,
      };
    }

    case 'REMOVE_USER': {
      return {
        ...state,
        user: null,
        isLoginned: false,
      };
    }

    default:
      return state;
  }
};
```

## Сложные dispatch

Как вы могли заметить в примере выше, dispatch отправляет по сути объект.

```tsx
dispatch(
  setUser({
    name: 'Kazimir',
    lastName: 'Presnov',
  })
);

// равносильно

dispatch(
  setUser({
    payload: {
      name: 'Kazimir',
      lastName: 'Presnov',
    },
    actionType: 'SET_USER',
  })
);
```

А можно ли сделать так, чтобы можно было отправить набор действий внутри какой-то функции со своей логикой?
Да, это называется расширением через доп-модули или прослойки a.k.a. `middlewares`, например Redux-Thunk.

## Реализация

### Создание хранилища

```tsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Доступ до данных из комопонента

#### useSelector()

Этот хук позволяет доставать данные из store.

```tsx
// левая часть – селектор, результат выполнения правой части
// правая часть – выборка данных через хук, у которого всегда есть какой-то `return`
const selectUser = useSelector((state) => {
  return state.user;
});
```

> Selector принимает единственный аргумент – Redux store state. Функция селекотора должна быть чистой функцией (pure function), то есть не должна создавать side-effects.

Каждый раз, когда компонент рендерится по какой-то причине, выполнятся и хук выборки данных.
Так и в обратном случае: если состояние стора, на которое подписался хук, изменилось, случится перерендер компонента, перевызовется хук и появятся новые данные.

> Внутри функционального компонента можно использовать хук useSelector() несколько раз. Каждый раз будет создаваться уникальная подписка на изменение состояния.

```tsx
const Component = () => {
  const user = useSelector((state) => state.user);
  const isLogined = useSelector((state) => state.isLogined);

  return <>// smth...</>;
};
```

Тут есть один подводный камень: `useSelector()` под капотом проверяет у себя разницу между значениями через `===`.
Если результат работы селектора – простой тип данных, то результат сравнения при равных значениях будет отрицательным, и новый ререндер компонента не случится.

В случае же, когда результат работы селектора – объект, то каждый раз будет проверка через `===` и скорее всего эта проверка будет отрицательной, что приведет к обновлению компонента.

В таких случаях прибегают к использованию дополнительной функции `shallowEqual`, которая, в случае объектов сравнивает значения полей. и в случае разницы об этом сообщает новым ререндером.

Используется это так:

```tsx
import { shallowEqual, useSelector } from 'react-redux';

// отправляется вторым аргументом
const selectedData = useSelector(selectorReturningObject, shallowEqual);

// или отправляется как поле `equalityFn` внутри объекта вторым аргументом
const selectedData = useSelector(selectorReturningObject, {
  // тут может быть своя реализация функции сравнения shallowEqual
  equalityFn: shallowEqual,
});
```

##### Продвинутый уровень владения селекторами

Кадый раз, когда в коде встречается useSelector(), создается новый объект, на который этот селектор ссылается. То есть в примере ниже, если компонент отрендерится 100 раз, 100 раз будет создан объект сравнения:

```tsx
import React from 'react';
import { useSelector } from 'react-redux';

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id]);

  return <div>{todo.text}</div>;
};
```

Чтобы такого не было, используют другой хук – `createSelector()` –, который позволяет запомнить один раз какой-то селектор и пользоваться одним его инстансом во многих местах.

```tsx
// selectors.ts
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const selectNumCompletedTodos = createSelector(
  (state) => state.todos,

  // собственная реализация функции сравнения
  (todos) => todos.filter((todo) => todo.completed).length
);

export { selectNumCompletedTodos };
```

```tsx
// main.tsx
import React from 'react';
import { selectNumCompletedTodos } from './selectors';

export const App = () => {
  const numCompletedTodos = useSelector(selectNumCompletedTodos);

  return (
    <>
      <span>Number of completed todos: {numCompletedTodos}</span>
    </>
  );
};
```

Еще немного про использование селекторов. В примере ниже используется селектор, результатом которого является объект.
Как мы знаем, в таком случае обновление компонента будет происходить каждый раз, как поменяется общее состояние, и не обязательно, что именно этот фрагмент общего состония.

В таком случае можно воспользоваться функцией `shallowEqual` либо прибегнуть к хитрости: сделать так, чтобы ожин селектор возвращал простой тип данных. Например, разбить на два разных селектора, как ниже.

```ts
// каждый раз этот селектор будет возвращать новую ссылку ,
// что приведет к тому. что компонент будет рендериться на абсолютно любое действие
const { count, user } = useSelector((state) => ({
  count: state.count,
  user: state.user,
}));
```

Правильнее будет написать два разных селектора:

```tsx
// selectors.ts
const count = useSelector((state) => state.count.value);
const user = useSelector((state) => state.auth.currentUser);
```

```tsx
// Main.tsx
function Component() {
  const count = useSelector(selectCount);
  const user = useSelector(selectUser);


  return (
    // usage of count and user
  )

}
```

### Отправка экшенов в store

#### use Dispatch()

```tsx
// userActions.ts
export const setUserLoggedIn = () => {
  return {
    actionType: 'REMOVE_USER',
  };
};

// app.tsx
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from './userActions';

const LogoutButton: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    return dispatch(setUserLoggedOut());
  }, [dispatch]);

  return <Button onClick={handleLogout}>Выйти</Button>;
};
```

В примере выше метод с `dispatch` внутри обернут в `useCallback` для мемоизации, в зависимость добавлен `dispatch`.
Но особого смысла в этом нет, потому что ссылка на `dispatch` не поменяется, пока не отправится в `<Provider>` новый `store`.

Но реакт и lint проверка не знают этого, поэтому подсвечивают всегда добавлять `dispatch` в зависимости мемоизированного значения.
Добавлять можно, это не доставляет дискомфорта.

#### useStore()

Это хук для доступа к `store`, при его использовании не происходит подписка до состояния приложения.
То есть при изменении состояния, компонент, внутри которого выполнен хук, не обновится, если рядом не будет других хуков, вызывающих обновление компонента.

```tsx
import React from 'react';
import { useStore } from 'react-redux';

export const ExampleComponent = ({ value }) => {
  const store = useStore();

  const onClick = () => {
    // Not _recommended_, but safe
    // This avoids subscribing to the state via `useSelector`
    // Prefer moving this logic into a thunk instead
    const numTodos = store.getState().todos.length;
  };

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState().todos.length}</div>;
};
```



1. `npm i react-redux redux`
2. `createStore`
3. `combineReducers`
4. 





## Какая есть альтернатива Redux?

1. MobX
2. Flux

3. Redux Tool-Kit (???)
