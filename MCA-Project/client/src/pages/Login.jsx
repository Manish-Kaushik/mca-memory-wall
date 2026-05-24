import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data.user);
      navigate('/wall');
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-3 rounded bg-gray-700 border-none text-white" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 rounded bg-gray-700 border-none text-white" onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-purple-600 py-3 rounded font-bold hover:bg-purple-500">Login</button>
      </form>
      <p className="text-center mt-4 text-gray-400">New here? <Link to="/register" className="text-purple-400">Register</Link></p>
    </div>
  );
};

export default Login;