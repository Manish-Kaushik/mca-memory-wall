import {
  useState,
  useContext
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  User,
  Mail,
  Lock,
  UserPlus,
  IdCard
} from 'lucide-react';

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

    <div className="min-h-screen bg-[#050816] flex flex-col justify-between overflow-hidden relative">

      {/* BACKGROUND BLURS */}

      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-700/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-pink-700/20 blur-3xl rounded-full"></div>

      {/* MAIN */}

      <div className="flex-1 flex justify-center items-center px-6 py-10 relative z-10">

        <div className="w-full max-w-[520px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">

          {/* ICON */}

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 mx-auto flex items-center justify-center mb-6 shadow-xl">

            <UserPlus size={36} />

          </div>

          {/* TITLE */}

          <h2 className="text-5xl font-bold text-center mb-3">

            Join The Wall

          </h2>

          <p className="text-gray-400 text-center mb-10 text-lg">

            Create your account and share memories ✨

          </p>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

            <div className="relative">

              <User
                className="absolute left-5 top-5 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-[#0b1220] border border-white/10 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-purple-500 text-lg"
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

            <div className="relative">

              <IdCard
                className="absolute left-5 top-5 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Enrollment Number"
                className="w-full bg-[#0b1220] border border-white/10 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-purple-500 text-lg"
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

            <div className="relative">

              <Mail
                className="absolute left-5 top-5 text-gray-400"
                size={20}
              />

              <input
                type="email"
                placeholder="student@mca.edu"
                className="w-full bg-[#0b1220] border border-white/10 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-purple-500 text-lg"
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

            <div className="relative">

              <Lock
                className="absolute left-5 top-5 text-gray-400"
                size={20}
              />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0b1220] border border-white/10 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-purple-500 text-lg"
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

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-2xl">

              Create Account

            </button>

          </form>

          {/* FOOTER */}

          <p className="text-center mt-8 text-gray-400">

            Already have an account?{' '}

            <Link
              to="/login"
              className="text-purple-400 hover:text-pink-400 font-semibold"
            >

              Login here

            </Link>

          </p>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur px-6 py-6 text-center text-gray-400">

        <p className="mb-2">

          Made with ❤️ by MCA Batch 2024–26

        </p>

        <p className="text-sm text-gray-500">

          © 2026 MCA Memory Wall. All rights reserved.

        </p>

      </footer>

    </div>

  );

};

export default Register;