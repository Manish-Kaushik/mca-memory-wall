import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression
from 'browser-image-compression';
import api from '../services/api';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Friends');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('message', message);
    formData.append('category', category);

    try {
      await api.post('/memories', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/wall');
    } catch (error) { alert('Upload Failed'); }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Upload Memory</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full text-white" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded bg-gray-700 text-white">
          <option>Friends</option><option>Farewell</option><option>Classroom</option><option>Canteen</option><option>Trips</option>
        </select>
        <textarea placeholder="Message (max 150 chars)" maxLength="150" className="w-full p-3 rounded bg-gray-700 text-white" onChange={e => setMessage(e.target.value)} required></textarea>
        <button className="w-full bg-purple-600 py-3 rounded font-bold">Upload</button>
      </form>
    </div>
  );
};

export default Upload;