import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', enrollment: '', email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data.user);
      navigate('/wall');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 rounded bg-gray-700 text-white" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="Enrollment No" className="w-full p-3 rounded bg-gray-700 text-white" onChange={e => setFormData({...formData, enrollment: e.target.value})} required />
        <input type="email" placeholder="Email" className="w-full p-3 rounded bg-gray-700 text-white" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 rounded bg-gray-700 text-white" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-green-600 py-3 rounded font-bold hover:bg-green-500">Create Account</button>
      </form>
    </div>
  );
};

export default Register;