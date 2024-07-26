import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SignUpFormInputs {
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    // Burada kayıt işlemini gerçekleştirin
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="bg-gray-300 w-full shadow p-4 flex items-center">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      </header>
      <main className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-xl mb-4">Create an Account</h2>
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
