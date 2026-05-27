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

const Register = () => {

  const [formData, setFormData] =
    useState({
      name: '',
      enrollment: '',
      email: '',
      password: ''
    });

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
            '/auth/register',
            formData
          );

        localStorage.setItem(
          'userInfo',
          JSON.stringify(data)
        );

        setUser(data.user);

        navigate('/wall');

      } catch (error) {

        alert(
          error.response?.data?.message ||
          'Registration Failed'
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

          Create Account

        </h2>

        <p className="text-gray-400 text-center mb-8">

          Join the MCA Memory Wall

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="text-sm text-gray-300 mb-2 block">

              Full Name

            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 transition"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              required
            />

          </div>

          {/* ENROLLMENT */}

          <div>

            <label className="text-sm text-gray-300 mb-2 block">

              Enrollment Number

            </label>

            <input
              type="text"
              placeholder="Enter enrollment no"
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-purple-500 transition"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  enrollment: e.target.value
                })
              }
              required
            />

          </div>

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
                setFormData({
                  ...formData,
                  email: e.target.value
                })
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
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
              required
            />

          </div>

          {/* BUTTON */}

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-xl font-bold text-white hover:opacity-90 transition shadow-xl">

            Create Account

          </button>

        </form>

        {/* FOOTER */}

        <p className="text-center text-gray-400 mt-6">

          Already have an account?{' '}

          <Link
            to="/login"
            className="text-purple-400 hover:text-pink-400 font-semibold"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;