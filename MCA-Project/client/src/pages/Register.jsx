import {
  useState,
  useContext
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  LogIn,
  Mail,
  Lock
} from 'lucide-react';

import api from '../services/api';

import {
  AuthContext
} from '../context/AuthContext';

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

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 w-full max-w-md glass rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 mx-auto flex items-center justify-center mb-4">

            <LogIn size={30} />

          </div>

          <h2 className="text-4xl font-bold mb-2">

            Welcome Back

          </h2>

          <p className="text-gray-400">

            Login to continue your memories

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="relative">

            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="relative">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500"
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl">

            Login

          </button>

        </form>

        <p className="text-center mt-6 text-gray-400">

          New here?{' '}

          <Link
            to="/register"
            className="text-purple-400 hover:text-pink-400"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;