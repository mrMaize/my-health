# Лекция посвящена качеству кода

Качество кода измеряется разными критериями:

1. читемость
2. понятность
3. предсказуемость
4. работоспособность

Читаемость и понятность кода очень похожие между собой понятия, они пересекаются.

Это в первую очередь понятные переменные, понятные названия функций и понятные параметры этих функций.
Наглядный пример:

```ts
function a(b, c, d) {
  // ...
}

function drawRectangle(firstPoint, secondPoint, thirdPoint) {
  // ...
}
```

Перед вами две похожие функции, но у второй читаемость и понятность гораздо выше.

Есть так же комментарии к коду, которые повышают понятность с точки зрения логики исполнения.

```ts
@param firstPoint object {x, y} as {number, number}
@param secondPoint object {x, y} as {number, number}
@param thirdPoint object {x, y} as {number, number}

function drawRectangle(firstPoint, secondPoint, thirdPoint) {
 // ...
}
```

Сразу понятно, что функция принимает три параметра, каждый из который является объектом с двумя числовыми полями – x, y.

На читаемость так же влияет общий портрет кода это отступы, кавычки, табуляция и прочее, параметров оформления много – это помогают
настраивать линтеры.

Линтер – это программа, которая форматирует код по заранее заданным правилам,
самый часто используемый – ESLint для JS / TSLint для TS, а так же Prettier.
Приведу пример форматированного кода и неформатированного, и вы сразу все поймете:

```ts
// неотформатированная функция
// const myFunction = ({firstParam, secondParam, significantlyExtendedVariableName, onotherVeryLongNameOfTheParameter, oneAnotherLongName, andYetTheresAnotherParamThere }) => {
//  const firstConst = null;

//  let firstVar="non zero value"
//  let secondVar='non null value';

//  if (firstVar.indexOf('non') === 6) {/* do something */ }
//  else {/* do something else */ }
// }
```

```ts
// отформатированная функция
const myFunction = ({
  firstParam,
  secondParam,
  significantlyExtendedVariableName,
  onotherVeryLongNameOfTheParameter,
  oneAnotherLongName,
  andYetTheresAnotherParamThere,
}) => {
  const firstConst = null;
  let firstVar = 'non zero value';
  let secondVar = 'non null value';

  if (firstVar.indexOf('non') === 6) {
    /* do something */
  } else {
    /* do something else */
  }
};
```

Собственно, этот пример красноречиво показывает важность единого стиля кода

Перейдем к TypeScript

TS также решает проблему понятности и читаемости, но в большей степени помогает в
предсказуемости и работоспособности.

### Частые ошибки при разработки больших проектов на ES6 без строгой типизации и ее проверки:

1. Частые undefined в самый неподходящий момент
2. Проброс разных структур в параметрах в один и тот же метод
3. Повышение времени разработки и отладки
4. Повышение LeadTime задачи
5. Злые менеджеры

Посмотрим на примерах:

```ts
let ticket;

function createPersonTicket(firstName, lastName) {
  return {
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    creationDate: new Date().getTime(),
    ticketUUID: 'TICKET-111',
    isFrozen: false,
  };
}

function freezeTicket(ticket) {
  ticket.isFrozen = true;
}

function onSuccess(ticket) {
  console.log(`Ticket with UUID '${ticket.ticketUUID}' has been deleted`); // ошибка получения поля у объекта, который уже undefined
}

function removeTicket(ticket, onSuccess) {
  ticket = undefined;

  onSuccess(ticket);
}

function getTicketUUID(ticket) {
  return ticket.ticketUUID;
}

artemsTicket = createPersonTicket('Artem', 'Kukuruza');
// artemsTicket = createPersonTicket(111, 555); // такой набор параметров кстати тоже прокатит

freezeTicket(artemsTicket);
getTicketUUID(ticket); // TypeError: Cannot read properties of undefined (reading 'ticketUUID')

removeTicket(artemsTicket, onSuccess);
getTicketUUID(artemsTicket);
```

Как можно улучшить этот код?

```ts
ticket && onSuccess?.();
```

Теперь ошибка возникнет на этапе выполнения

```ts
getTicketUUID(artemsTicket); // ошибка опять же по той же причине – билет уже undefined.
```

проблема в том, что надо запустить, поймать ошибку, внести корректировку и снова запустить
и так может быть много итераций

например, в какой-то момент я перестану делать из билета null, а сделаю новый объект – {} или null по определенным правилам

```ts
function removeTicket(ticket, onSuccess) {
 if (ticket.UUID.indexOf('111' !== -1)) {
  ticket = {
   UUID: ticket.ticketUUID,
   deleted: true
  }
 } else {
  ticket = null;
 }
};

onSuccess(ticket); // код выполнится без ошибок
// Ticket with UUID 'undefined' has been deleted

// но такой результат нас не устроит, захочется обработать такой кейс, и мы внесем корректировки:

function onSuccess(ticket) {
 if (ticket?.UUID) {
 console.log(`Ticket with UUID '${ticket.ticketUUID}' has been deleted`); // ошибка получения поля у объекта, который уже undefined
} else {
 console.log(`Ticket has been deleted`);
}
```

чувствуете уровень нарастающего сюрра?

А это только разминка

Вспомним про подмену данных:

```ts
function createPerson() {
  return {
    // person's fields
  };
}

function createDog() {
  return {
    // dog's fields
  };
}

const dog = createDog();
const person = createPerson();

console.log(`A man named ${dog.name} has a dog named ${dog.name}`); // код исполнится, но будет полная чепуха
```

А теперь посмотрим на пример с React-компонентом

```tsx
const DogInfo = (name, poroda, age, color, food) => (
  <>
    <div>{name}</div>
    <div>{poroda}</div>
    <div>{age}</div>
    <div>{color}</div>
    <div>{color}</div>
    <div>
      <ul>
        {food.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  </>
);

const Container = () => {
  return (
    <DogInfo
      name={'sharik'}
      poroda={'retriver'}
      age={'5'}
      color={'golden brown'}
      food={[FOOD.MEAT, FOOD.CHEESE, FOOD.WARM_MILK]}
    />
  );
};

<Conntainer />;
```

```tsx
// тоже выполнится и отрисуется, но будет брехня
const Container_2 = () => {
  return (
    <DogInfo
      name={'sharik'}
      poroda={'retriver'}
      age={() => console.log('this is sparta')}
      color={'golden brown'}
      food={[FOOD.MEAT, FOOD.CHEESE, FOOD.WARM_MILK]}
    />
  );
};

<Container_2 />;
```

```tsx
// вылетит на ошибке, что не может обработать food, потому что оно UNDEFINED!!!
const Container_3 = () => {
  return <DogInfo name={'sharik'} poroda={'retriver'} color={'golden brown'} />;
};

<Container_3 />;
```

Всех этих ошибок позволяет избежать TS через типизацию входных параметров
Типизировать входные параметры можно используя `Type` и `Interface` и просто типизация отдельных параметров в некоторых случаях.

Пример типа.
Хорошим тоном среди разработчиков считается характерная заглавная буква T перед названием типа.

### Сигнатура типов:

```ts
type <type name> = {
  <param name>: <param type>,
  <param name>: <param type>,
  // ...
}
```

### Рассмотрим на примере просто функции:

```ts
function calculateSumm(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  return null;
}
```

### По умолчанию все параметры и переменные имеют тип `any`, то есть все, что угодно:

```ts
function calculateSummTs(a: any, b: any) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  return null;
}
```

### Простая типизация спасает от нагромождений в коде

```ts
function calculateSummTs2(a: number, b: number) {
  return a + b;
}

// уже нельзя будет вызвать
calculateSummTs2('1', '2');

// или так, будет ругаться уже Typescript Checker
calculateSummTs2(2, '2');
```

```ts
function drawRectangle(
  firstPoint: { x: number; y: number },
  secondPoint: { x: number; y: number },
  thirdPoint: { x: number; y: number }
) {
  // ...

  // TS нам подскажет, что x, y – это числа
  const { x, y } = firstPoint;
}
```

видно, что типизация `{x: number, y: number}` повторяется для трех координат,
это можно упростить, вынеся `{x: number, y: number}` отдельно в тип, запишем:

```ts
type TPoint = {
  x: number;
  y: number;
};

function drawRectangle_(
  firstPoint: TPoint,
  secondPoint: TPoint,
  thirdPoint: TPoint
) {
  // ...
}
```

### можно сделать тип для одного параметра, который будет состоять сразу из 3 точек

```ts
type TPoint = {
  x: number;
  y: number;
};

type TPoints = {
  firstPoint: TPoint;
  secondPoint: TPoint;
  thirdPoint: TPoint;
};

function drawRectangle(params: TPoints) {
  // ...
}
```

## Простые типы и сложные

есть простые типы и сложные
простые: number, string, boolean, symbol, null, undefined

### сложные: массивы, объекты

```ts
// arrays
type TArray = Array<number>;
type TArrayOfObjects = Array<{ x: number; y: number }>;
type ArrayOfArrays = Array<TArray>;

// example
const numbers: ArrayOfArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

```ts
// пример типа массива с только двумя значениями и не более
type TArrayOfDoubles = Array<[number, number]>;
```

```ts
// пример невалидный: не подойдет, будет ошибки проверки, мол подсунули 3 числа, а надо только 2 числа
const doubleNumbersArray: TArrayOfDoubles = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// пример валидный
const doubleNumbersArrayValid: TArrayOfDoubles = [
  [1, 2],
  [4, 5],
  [7, 8],
];

// можно комбинировать
type ArrayOfNumberAndString = Array<[number, string]>;
const arrayOfNumberAndString: ArrayOfNumberAndString = [
  [1, 'i'],
  [2, 'b'],
  [3, 'c'],
];

// типизация объектов
type TPerson = {
  firstName: string;
  lastName: string;
  age: number;
};

// валидный пример
const personObject: TPerson = {
  firstName: 'Artem',
  lastName: 'Kukuruza',
  age: 29,
};

// так же можно описывать типовые объекты, например, как описать объект ключ-значение для алфафита
type TAlphabet = Record<string, string>;

const alphabet: TAlphabet = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
  // ...
};
```

### А если мы хотим сделать так, чтобы ключами могли быть только числа от 0 до 9?

```ts
type TNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type TMapWithKeysAreNumbers = Record<TNumber, string>;
```

### невалидный пример

```ts
const alphabet: TMapWithKeysAreNumbers = {
  0: 'a',
  1: 'b',
  2: 'c',
  6: 'g',
  7: 'h',
  24: 'h', // тут будет ошибка, потому что ключ `24` недоступен
  // ...
};
```

### Что можно делать с типами:

1. Наследовать дргуг от друга
2. Объединять
3. Пересекать
4. Частично выбирать поля

// примеры

// наследование

// объединение

// пересечение

// частичная выборка

// Символ `?`
// что это, зачем, как работает, разница между `field?: number` и `field: number | undefined`

Интерфейсы

1. Что это
2. Отличие от типов
3. Как определять интерфейсы
4. Наследование интерфейсов
5. Пересечение интерфейсов
6. Partial, Omit, Pick

## ESLint

ESLint — это инструмент статического анализа,
который проверяет код TypeScript на читаемость,
ремонтопригодность и функциональные ошибки.

Он широко поддерживается современными редакторами и
системами сборки и может быть настроен с помощью
собственных правил, конфигураций и форматировщиков.

> It should be placed in the root directory of your project
> and export an array of configuration objects. Here’s an example:

```js
// eslint.config.js
export default [
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
  },
];
```

## Prettier

### Установка пакета

`npm i prettier -D`

```sh
# создаем в корне проекта файлик с названием `.prettierrc`
touch .prettierrc
```

### Настройки VSCode

`Command + Shift + P`

ищем там строку
`"editor.defaultFormatter": "esbenp.prettier-vscode",`

> esbenp.prettier-vscode – будет написано в описании к плагину

### правила prettier:

```ts
{
  "singleQuote": true,
  "semi": true, // точка с запятой в конце строки
  "tabWidth": 2, // размер одного таба в пробелах
  "endOfLine": "lf", // конец строки
  "bracketSpacing": true, // интервалы между скобочками
  "trailingComma": "all", // висящая запятая в объектах
  "printWidth": 80, // ширина строки в редакторе, после которой нужео переносить на новую строку
  "arrowParens": "always" // нужно ли помещать параметры функции в скобочки
}
```

```ts
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { load, remove, save } from '../utils/storage';

import useStateAsync from './useStateAsync';

type TReturnValue<S> = [
  [S | undefined, Dispatch<SetStateAction<S | undefined>>][0],
  (value: S) => Promise<void>,
  () => Promise<void>,
  boolean,
];

/**
 * This hook is used to manage Local Storage by `localStorageKey`
 *
 * @param localStorageKey – key, to use for Local Storage
 * @return [value, setValueToLocalStorage, removeValueFromLocalStorage, isLoadingValue]
 *
 * @example const [testValue, setTestValue] = useLocalStorage<boolean>('test')
 * @example const [userPhone, setUserPhone, deleteUserPhone, isLoadingUserPhone] = useLocalStorage<string>('userPhone')
 *
 * You can skip unused properties
 * @example const [userPhone, , , isLoadingUserPhone] = useLocalStorage<string>('userPhone')
 */
const useLocalStorage = <S>(localStorageKey: string): TReturnValue<S> => {
  const [state, setState] = useStateAsync<S>();
  const [isLoading, setIsLoading] = useStateAsync<boolean>(true);

  useEffect(() => {
    async function getValueFromStorage() {
      try {
        const value = await load(localStorageKey);
        setIsLoading(false);

        return setState(value);
      } catch (e) {
        console.error(e);
      }
    }

    getValueFromStorage();
  }, [localStorageKey, setIsLoading, setState]);

  const setValueToLocalStorage = useCallback(
    async (value: S) => {
      try {
        await save(localStorageKey, value);

        return setState(value);
      } catch (e) {
        console.error(e);
      }
    },
    [localStorageKey, setState]
  );

  const removeValueFromLocalStorage = useCallback(async () => {
    try {
      await remove(localStorageKey);

      return setState(undefined);
    } catch (e) {
      console.error(e);
    }
  }, [localStorageKey, setState]);

  return [
    state,
    setValueToLocalStorage,
    removeValueFromLocalStorage,
    isLoading,
  ];
};

export default useLocalStorage;
```
