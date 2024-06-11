# Занятие 27_28: Валидация форм

## React-hook-form

> Документация проекта: https://react-hook-form.com/

Что это:
Небольшая библиотека для работы с формами в реакте.

Для чего нужно:

1. Управлять данными формы
2. Отправлять данные формы на сервер
3. Проводить валидацию
4. Визуально выводить состояние формы

```tsx
const form = useForm();
```

### Как трекать состояние формы

```tsx
const Form = () => {
  const form = useForm();
  const { register } = form;
  const { name, ref, onChange, onBlur } = register('username');

  return (
    <form>
      <div>
        <label htmlFor="username">Имя</label>
        <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </form>
  );
};
```

Либо воспользовать опцией спреда у объектов и сократить количество кода:

```tsx
const Form = () => {
  const form = useForm();
  const { register } = form;

  return (
    <form>
      <div>
        <label htmlFor="username">Имя</label>
        <input type="text" id="username" {...register('username')} />
      </div>
    </form>
  );
};
```

> Точно так же нужно сделать с другими полями формы, чтобы подписаться на управление полями формы.

Теперь добавим дев-тулзы для нашей формы

```bash
npm i -D @hookform/devtools
```

в комопоненте с формой достанем DevTool из библиотеки и добавим на страницу:

```tsx
import {DevTool} from
// ....

const Form = () => {
 const form = useForm();
 const { register, control } = form;

return (
 <>
  <form>
    {/* ... */}
  </form>
  <DevTool control={control} />
 </>
 );
}
```

Так мы связали нашу форму и дев-тулз, теперь в браузере будет чуть больше информации для разработки

`touched` – true, если с полем взаимодействовали
`dirty` – true, если значение изменилось

### Обновляется ли компонент, когда меняется состояние инпутов формы?

Нет, не обновляется. Это очень полезно с точки зрения производительности приложения.

### Сабмит формы

Нужно сделать функцию, которая будет вызываться на действие `onSubmit`:

```tsx
// ....
const Form = () => {
  const form = useForm();
  const { handleSubmit } = form;

  const onSubmit = (data) => {
    // action to do with submitted `data`
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>{/* ... */}</form>
    </>
  );
};
```

Осталось добавить типы для TS и отправить их в форму:

Создадим тип для наших данных и заиспользуем его при инициализации формы

```tsx
// ....
type TFormValues = {
  // описание типов полей формы
  // ...
};

const Form = () => {
  const form = useForm<TFormValues>();
  const { handleSubmit } = form;

  const onSubmit = (data: TFormValues) => {
    // action to do with submitted `data`
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>{/* ... */}</form>
    </>
  );
};
```

### Валидация формы

React Hook Form поддерживает разные правила валидации, например:

1. required
2. minLength & maxLength
3. min & max
4. pattern

Добавим в форму флаг `noValidate`, который скажет не валидировать форму браузеру, а отдаст валидацию в руки нашей библиотеки.

```tsx
<form noValidate>{/* ... */}</form>
```

Теперь можно добавить кастомную валидацию в поля формы, дополнив метод `register` вторым аргументом:

```tsx
const Form = () => {
  const form = useForm();
  const { register } = form;

  return (
    <form noValidate>
      <div>
        <label htmlFor="username">Имя</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'Поле обязательно для ввода',
          })}
        />
      </div>
    </form>
  );
};
```

Теперь, если попробовать засабмиттить форму с пустым полем, в дев-тулзах появится сообщение, что есть ошибки, укажется ее тип и сообщение об ошибке. Добавим для поля `username` проверку на непустое значение, а для поля `email` добавим две проверки: непустое значение и формат `email`.

```tsx
const Form = () => {
  const form = useForm<TFormValues>();
  const { register, handleSubmit } = form;

  const onSubmit = (data: TFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Имя</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'Поле обязательно для ввода',
          })}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register('email', {
            required: 'Поле обязательно для ввода',
            pattern: {
              value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
              message: 'Неверный формат email',
            },
          })}
        />
      </div>

      <Button>Соранить</Button>
    </form>
  );
};
```

### Отображение ошибок для полей формы

Для этого достанем из `form` дополнительный объект `formState`, из которого потом достанем `errors`.

```tsx
const Form = () => {
  const form = useForm<TFormValues>();
  const { /*...*/, formState } = form;
  const {errors} = formState;


  return (
    <form noValidate>
      <div>
        <label htmlFor="username">Имя</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'Поле обязательно для ввода',
          })}
        />

        {/* добавялем вывод ошибки */}
        <p>{errors.username?.message}</p>
      </div>
      <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: 'Поле обязательно для ввода',
              pattern: {
                value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
                message: 'Неверный формат email',
              },
            })}
          />

          {/* добавялем вывод ошибки */}
          <p>{errors.email?.message}</p>
        </div>

        <Button>Соранить</Button>
    </form>
  );
};
```

### Кастомная валидация

Кастомная валидация позволяет не только проверять поле на наличие значения. а еще позволяет отображать уникальные соообщения, если значение поля равно чему-то определенному.

Помимо поля `required` можно добавить дополнительное поле `validate`.

Рассмотрим случай:

```tsx
<input
  type="text"
  id="username"
  {...register('username', {
    required: 'Поле обязательно для ввода',
    validate: (fieldValue) => {
      return fieldValue !== 'admin' || 'Выберите другое название пользователя';
    },
  })}
/>
```

или можно разложить поле `validate` на части:

```tsx
<input
  type="text"
  id="username"
  {...register('username', {
    required: 'Поле обязательно для ввода',
    validate: {
     notAdminUsername: (fieldValue) => {
      return fieldValue !== 'admin' || 'Выберите другое имя пользователя';
     },
     notSpongebobUsername: (fieldValue) => {
      return fieldValue !== 'squarePants' || 'Вы не можете назвать себя Спанчбобом'
     }
  })}
/>
```

### Установка значений по умолчанию

Для этого хук `useForm()` надо вызывать с парметром, а именно с объктом, содержащим поля по умолчанию.

```tsx
const form = useForm<TFormValues>({
  defaultValues: {
    username: '',
    email: '',
    channel: '',
  },
});
```

Таким образом можно предзаполнять форму данными.

### Каким образом хранить не плоский объект, а более сложный, с вложенностями

Все довольно просто, надо этотй вложенный объект определить в типах, обновить объект значений по умолчанию, а нужные нам поля регистрировать, используя точку, например `address.street`

```tsx
const Form = () => {
  const form = useForm<TFormValues>({
    defaultValues: {
      address: {
        street: '',
        buildingNumber: '',
        blockNumber: '',
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="street">Канал</label>
        <input
          type="text"
          id="street"
          {...register('address.street', {
            required: 'Поле обязательно для ввода',
          })}
        />
      </div>

      <div>
        <label htmlFor="buildingNumber">Канал</label>
        <input
          type="text"
          id="buildingNumber"
          {...register('address.buildingNumber', {
            required: 'Поле обязательно для ввода',
          })}
        />
      </div>

      <div>
        <label htmlFor="blockNumber">Канал</label>
        <input
          type="text"
          id="blockNumber"
          {...register('address.blockNumber', {
            required: 'Поле обязательно для ввода',
          })}
        />
      </div>

      <Button>Submit</Button>
    </form>
  );
};
```

Теперь при сабмите формы, будет формироваться объект вида:

```json
{
  "username": "asdsa",
  "email": "a@a.a",
  "channel": "asd",
  "address": {
    "street": "asd",
    "buildingNumber": "asd",
    "blockNumber": "asd"
  }
}
```

### Как работать с динамическими формами

Для этого есть дополниельный хук, называется `useFieldArray`.

1. Расширим тип полем `phoneNumbers`

```tsx
type TFormValues = {
  username: string;
  email: string;
  channel: string;
  address: {
    street: string;
    buildingNumber: string;
    blockNumber: string;
  };
  phoneNumbers: Array<{ number: string }>;
};
```

2. исползуем хук `useFieldArray`

```tsx
// достаем объект `control`
const { control } = form;

// определим `useFieldArray` и достанем объект со значениями
const { fields: phones } = useFieldArray({
  name: 'phoneNumbers',
  control,
});

return (
  <div>
    <label htmlFor="phones">Телефоны</label>
    {/* идем по списку номеров и рисуем текстовые поля */}
    {phones.map((phone, index) => (
      <input
        key={phone.id}
        type="text"
        id="blockNumber"
        // регистрируем наш номер телефона таким образом
        {...register(`phoneNumbers.${index}.number`, {
          required: 'Поле обязательно для ввода',
        })}
      />
    ))}
    <Button>
  </div>
);
```

Чтобы добавить новый номер телефона, необходимо из `useFieldArray` достать объект `append`

```tsx
// достаем объект `control`
const { control } = form;

// определим `useFieldArray` и достанем объект со значениями
const { fields: phones, append } = useFieldArray({
  name: 'phoneNumbers',
  control,
});

return (
  <div>
    <label htmlFor="phones">Телефоны</label>
    {/* идем по списку номеров и рисуем текстовые поля */}
    {phones.map((phone, index) => (
      <input
        key={phone.id}
        type="text"
        id="blockNumber"
        // регистрируем наш номер телефона таким образом
        {...register(`phoneNumbers.${index}.number`, {
          required: 'Поле обязательно для ввода',
        })}
      />
    ))}
    <Button>
  </div>
);
```

Теперь при сабмите формы будет получаться вот такой объект:

```json
{
  "username": "Name",
  "email": "a@a.a",
  "channel": "channel1",
  "address": {
    "street": "asdasd",
    "buildingNumber": "1",
    "blockNumber": "1"
  },
  "phoneNumbers": [
    {
      "number": "891971856561"
    },
    {
      "number": "891971856562"
    },
    {
      "number": "891971856565"
    }
  ]
}
```

Для удаления воспользуемся похожим образом, только вместо `append` будем использовать `remove`

```tsx
const {
  fields: phones,
  append,
  remove,
} = useFieldArray({
  name: 'phoneNumbers',
  control,
});

return (
  <div>
    <label htmlFor="phones">Телефоны</label>
    {phones.map((phone, index) => (
      <div key={phone.id}>
        <input
          type="text"
          id="phoneNumbers"
          {...register(`phoneNumbers.${index}.number`, {
            required: 'Поле обязательно для ввода',
          })}
        />
        {/* Если это не первый номер, то его можно удалить */}
        {index > 0 && <Button onClick={() => remove(index)}>-</Button>}
      </div>
    ))}

    <Button onClick={() => append({ number: '' })}>+</Button>
  </div>
);
```

## YUP

> Документация проекта: https://yup-docs.vercel.app/docs/intro

Yup – это библиотека для создания валидационных схем, чтобы проверять поля формы на валидность.

`React-hook-form` прекрасно с ней умеет интергироваься, посмотрим на практике.

Для начала установим необходимые пакеты из `npm`

`npm i yup @hookform/resolvers`

Теперь создадим файл для валидационной схемы `form.schema.ts`, и начнем его наполнять.

Как вы знаете из практики, в `react-hook-form` тоже есть валидация, выглядит она слеующим образом:

```tsx
<input
  type="text"
  id="username"
  {...register('username', {
    required: 'Поле обязательно для ввода',

    // валидация
    validate: {
      notAdminUsername: (fieldValue) => {
        return fieldValue !== 'admin' || 'Выберите другое имя пользователя';
      },
      notSpongebobUsername: (fieldValue) => {
        return (
          fieldValue !== 'squarePants' || 'Вы не можете назвать себя Спанчбобом'
        );
      },
    },
  })}
/>
```

В начале файла `form.schema.ts` нужно импортировать `yup`:
`import * as yup from 'yup';`

Далее нужно описать сам объект схемы:

```tsx
export const schema = yup.object({
  // название поля, которое хотим проверять
  username: yup

    // говорим, что это должна быть строка
    .string()

    // проверяем на непустое значение этого поля
    .required('Поле обязательно для ввода')

    // проверяем дополнительно регулярным выражением
    .matches(/^[ЁёА-Яа-я][ЁёА-Яа-я-']+$/, 'Достпуны только русские буквы'),

  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле обязательно для ввода'),
});
```

Теперь эту схему нужно подключить к форме, для этого импортируем схему в файл с формой и указываем поле `resolvers` в регистрации хука `useForm()`:

```tsx
const form = useForm<TFormValues>({
  defaultValues: {
    username: '',
    email: '',
    channel: '',
  },
  resolver: yupResolver(schema),
});
```

 Теперь поля в форме будут проверяться нашей схемой валидации.
