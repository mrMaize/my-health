import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../../../shared/components';

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

const defaultValues = {
  username: '',
  email: '',
  channel: '',
  address: {
    street: '',
    buildingNumber: '',
    blockNumber: '',
  },
  phoneNumbers: [
    {
      number: '',
    },
  ],
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
`;

const ErrorMessage = styled.div`
  color: darkred;
  font-size: 12px;
  height: 15px;
`;

const PhoneContainer = styled.div`
  display: flex;
  margin-bottom: 7px;
`;

const DeleteButton = styled.button`
  color: lightgrey;
  background-color: darkred;
  font-weight: 700;
  margin-left: 5px;
`;

const ValidatedReactHookForm: FC = () => {
  const form = useForm<TFormValues>({
    defaultValues,
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const {
    fields: phones,
    append,
    remove,
  } = useFieldArray({
    name: 'phoneNumbers',
    control,
  });

  // пример с отдельными полями, которые можно пробросить в текстовое поле по отдельности
  // const { name, ref, onChanges, onBlur } = register('username', {
  //   required: 'Поле обязательно для ввода',
  // });

  const onSubmit = (data: TFormValues) => {
    console.log(JSON.stringify(data, null, ' '));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputContainer>
          <label htmlFor="username">Имя</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: 'Поле обязательно для ввода',
              validate: {
                notAdminUsername: (fieldValue) => {
                  return (
                    fieldValue !== 'admin' || 'Выберите другое имя пользователя'
                  );
                },
                notSpongebobUsername: (fieldValue) => {
                  return (
                    fieldValue !== 'squarePants' ||
                    'Вы не можете назвать себя Спанчбобом'
                  );
                },
              },
            })}
          />
          {/* добавялем вывод ошибки */}
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
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
          <ErrorMessage>{errors.email?.message ?? ''}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label htmlFor="channel">Канал</label>
          <input
            type="text"
            id="channel"
            {...register('channel', {
              required: 'Поле обязательно для ввода',
            })}
          />
          {/* добавялем вывод ошибки */}
          <ErrorMessage>{errors.channel?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label htmlFor="street">Улица</label>
          <input
            type="text"
            id="street"
            {...register('address.street', {
              required: 'Поле обязательно для ввода',
            })}
          />
          <ErrorMessage>{errors.address?.street?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label htmlFor="buildingNumber">Номер дома</label>
          <input
            type="text"
            id="buildingNumber"
            {...register('address.buildingNumber', {
              required: 'Поле обязательно для ввода',
            })}
          />
          <ErrorMessage>{errors.address?.buildingNumber?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label htmlFor="blockNumber">Номер квартиры</label>
          <input
            type="text"
            id="blockNumber"
            {...register('address.blockNumber', {
              required: 'Поле обязательно для ввода',
            })}
          />
          <ErrorMessage>{errors.address?.blockNumber?.message}</ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label htmlFor="phones">Телефоны</label>
          {phones.map((phone, index) => (
            <div key={phone.id}>
              <PhoneContainer>
                <input
                  type="text"
                  id="phoneNumbers"
                  {...register(`phoneNumbers.${index}.number`, {
                    required: 'Поле обязательно для ввода',
                  })}
                />
                {index > 0 && (
                  <DeleteButton onClick={() => remove(index)}>-</DeleteButton>
                )}
              </PhoneContainer>

              <ErrorMessage>
                {errors.phoneNumbers?.[index]?.number?.message}
              </ErrorMessage>
            </div>
          ))}

          <Button onClick={() => append({ number: '' })}>+</Button>
        </InputContainer>

        <Button>Submit</Button>
      </form>

      <DevTool control={control} />
    </>
  );
};

export { ValidatedReactHookForm };
