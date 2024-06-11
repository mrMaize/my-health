import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[ЁёА-Яа-я][ЁёА-Яа-я-']+$/, 'Достпуны только русские буквы')
    .required('Поле обязательно для ввода'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле обязательно для ввода')
    .notOneOf(
      [
        yup.ref('email2'),
        yup.ref('email3'),
        yup.ref('email4'),
        yup.ref('email5'),
      ],
      'asdsad'
    ),
  channel: yup
    .string()
    .required('Поле обязательно для ввода')
    .matches(/^[ЁёА-Яа-я][ЁёА-Яа-я-']+$/, 'Доступны только русские буквы'),
});
