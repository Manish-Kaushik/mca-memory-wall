import {
  useState,
  useContext
} from 'react';

import {
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
            '/auth/register',
            formData
          );

        // auto login after register

        loginUser(data);

        navigate('/wall');

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          'Registration Failed'

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">

      <h2 className="text-3xl font-bold mb-6 text-center">

        Create Account 🚀

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"

          placeholder="Full Name"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-green-500"

          onChange={(e) =>
            setFormData({

              ...formData,

              name:
                e.target.value

            })
          }

          required
        />

        <input
          type="text"

          placeholder="Enrollment No"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-green-500"

          onChange={(e) =>
            setFormData({

              ...formData,

              enrollment:
                e.target.value

            })
          }

          required
        />

        <input
          type="email"

          placeholder="Email"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-green-500"

          onChange={(e) =>
            setFormData({

              ...formData,

              email:
                e.target.value

            })
          }

          required
        />

        <input
          type="password"

          placeholder="Password"

          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-green-500"

          onChange={(e) =>
            setFormData({

              ...formData,

              password:
                e.target.value

            })
          }

          required
        />

        <button
          disabled={loading}

          className="w-full bg-green-600 py-3 rounded-lg font-bold hover:bg-green-500 transition"
        >

          {
            loading
              ? 'Creating Account...'
              : 'Create Account'
          }

        </button>

      </form>

    </div>

  );

};

export default Register;