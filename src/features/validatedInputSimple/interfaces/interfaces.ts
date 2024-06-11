export enum EValidation {
  REQUIRED = 'required',
  NUMBER = 'number',
  LATIN = 'latin',
  CYRILLIC = 'cyrillic',
  EMAIL = 'email',
  MAX_LENGTH = 'max-length',
  MIN_LENGTH = 'min-length',
  AGE = 'age',
}

export enum EErrorMessages {
  REQUIRED = 'Поле обязательно',
  MIN_DATE = 'Дата окончания должна быть позже чем дата начала',
  MIN_TIME = 'Время окончания не может быть раньше чем время начала',
  EMAIL = 'Некорректный почтовый ящик',
  PHONE = 'Некорректный номер телефона',
  NUMBER = 'Должно быть числом',
  DATE = 'Неверный формат даты',
  // eslint-disable-next-line
  MIN = 'Значение не может быть меньше ${min}',
  // eslint-disable-next-line
  MAX_LENGTH = 'Длина текста не может быть больше ${max} символов',
  // eslint-disable-next-line
  MAX = 'Значение не может быть больше ${max}',
  // eslint-disable-next-line
  MAX_FILES = 'Превышен лимит в ${max} файлов',
  REGEX = 'Недопустимые символы',
  CYRILLIC = 'Допустимы только русские символы',
  LATIN = 'Допустимы только латинские символы',
  AGE = 'Допустимо только число больше нуля',
}
