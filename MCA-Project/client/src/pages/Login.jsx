import {
  useState,
  useContext
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';

import api from '../services/api';

const Login = () => {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const {
    setUser
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await api.post(
            '/auth/login',
            {
              email,
              password
            }
          );

        localStorage.setItem(
          'userInfo',
          JSON.stringify(data)
        );

        setUser(data.user);

        navigate('/wall');

      } catch (error) {

        alert(
          'Invalid Credentials'
        );

      }

    };

  return (

    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full"></div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold shadow-xl">

            M

          </div>

        </div>

        {/* TITLE */}

        <h2 className="text-4xl font-bold text-center text-white mb-2">

          Welcome Back

        </h2>

        <p className="text-gray-400 text-center mb-8">

          Login to continue your memories

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="text-sm text-gray-300 mb-2 block">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 transition"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-sm text-gray-300 mb-2 block">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 transition"
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* BUTTON */}

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-xl font-bold text-white hover:opacity-90 transition shadow-xl">

            Login

          </button>

        </form>

        {/* FOOTER */}

        <p className="text-center text-gray-400 mt-6">

          Don’t have an account?{' '}

          <Link
            to="/register"
            className="text-purple-400 hover:text-pink-400 font-semibold"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;