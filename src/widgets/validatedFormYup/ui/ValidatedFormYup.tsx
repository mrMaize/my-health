import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../../shared/components';
import { schema } from '../schema/ValidatedForm.schema';

type TFormValues = {
  username: string;
  email: string;
  channel: string;
};

const ValidatedFormYup = () => {
  const form = useForm<TFormValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: TFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Имя</label>
          <input type="text" id="username" {...register('username')} />

          <p>{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register('email')} />

          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="channel">Канал</label>
          <input type="text" id="channel" {...register('channel')} />

          <p>{errors.channel?.message}</p>
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export { ValidatedFormYup };
