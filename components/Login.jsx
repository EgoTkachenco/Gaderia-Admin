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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value ? null : 'Invalid password'),
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
        <h3 className="text-center text-xl font-bold ">Gaderia Admin Panel</h3>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-8" onSubmit={form.onSubmit(onSubmit)}>
            <Input
              name="email"
              label="Email address"
              placeholder="Enter your email"
              {...form.getInputProps('email')}
              labelPlacement="outside"
              errorMessage={form.getInputProps('email').error}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps('password')}
              labelPlacement="outside"
              errorMessage={form.getInputProps('password').error}
            />

            <Button type="submit" color="primary" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
