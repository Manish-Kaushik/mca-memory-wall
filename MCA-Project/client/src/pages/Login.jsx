import {
  useState,
  useContext
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import api from '../services/api';

import {
  AuthContext
} from '../context/AuthContext';

const Login = () => {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const {
    loginUser
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const { data } =
          await api.post(
            '/auth/login',
            {
              email,
              password
            }
          );

        // context login

        loginUser(data);

        navigate('/wall');

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          'Invalid Credentials'
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">

      <h2 className="text-3xl font-bold mb-6 text-center">

        Welcome Back 👋

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"

          placeholder="Email"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-purple-500"

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          required
        />

        <input
          type="password"

          placeholder="Password"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-purple-500"

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          required
        />

        <button
          disabled={loading}

          className="w-full bg-purple-600 py-3 rounded-lg font-bold hover:bg-purple-500 transition"
        >

          {
            loading
              ? 'Logging in...'
              : 'Login'
          }

        </button>

      </form>

      <p className="text-center mt-5 text-gray-400">

        New here?{' '}

        <Link
          to="/register"
          className="text-purple-400 hover:underline"
        >

          Register

        </Link>

      </p>

    </div>

  );

};

export default Login;