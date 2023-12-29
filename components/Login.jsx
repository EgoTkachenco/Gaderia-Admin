import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button, Input } from '@nextui-org/react';
import { login } from '../api';
import { useForm } from '@mantine/form';

export const Login = () => {
  const router = useRouter();
  const { log } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Невірний email'),
      password: (value) => (value ? null : 'Невірний пароль'),
    },
  });

  const onSubmit = (values) => {
    login(values)
      .then((res) => {
        log(res.data.data);
        router.push('/');
      })
      .catch((err) => {
        form.setErrors(err.response?.data?.error);
      });
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 items-center">
      <div className="bg-default-50 shadow-lg rounded-xl p-8 w-96">
        <h3 className="text-center text-xl font-bold ">
          Адміністративна панель Gaderia
        </h3>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-8" onSubmit={form.onSubmit(onSubmit)}>
            <Input
              name="email"
              label="Пошта"
              placeholder="Введіть вашу пошту"
              {...form.getInputProps('email')}
              labelPlacement="outside"
              errorMessage={form.getInputProps('email').error}
            />

            <Input
              name="password"
              type="password"
              label="Пароль"
              placeholder="Введіть ваш пароль"
              {...form.getInputProps('password')}
              labelPlacement="outside"
              errorMessage={form.getInputProps('password').error}
            />

            <Button type="submit" color="primary" className="w-full">
              Увійти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
