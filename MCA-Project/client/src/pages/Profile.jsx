import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Linkedin, Instagram, Github, Phone, Mail, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [memories, setMemories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', linkedin: '', instagram: '', github: '' });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone || '', linkedin: user.linkedin || '', instagram: user.instagram || '', github: user.github || '' });
      fetchMyMemories();
    }
  }, [user]);

  const fetchMyMemories = async () => {
    try {
      const { data } = await api.get('/memories');
      setMemories(data.filter(m => m.userId._id === user._id));
    } catch (error) { console.error(error); }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      setFormData({ name: user.name, phone: user.phone || '', linkedin: user.linkedin || '', instagram: user.instagram || '', github: user.github || '' });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', formData);
      updateUser(data.user);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsEditing(false);
      alert('Profile Updated!');
    } catch (error) { alert('Error updating profile'); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!user) return <div className="text-white p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover shadow-lg" />
            <div className="flex-1 w-full text-center md:text-left">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" placeholder="Name" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram URL" className="bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                    <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" className="bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                  </div>
                  <div className="flex gap-3 justify-center md:justify-start pt-2">
                    <button type="submit" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-full font-bold transition flex items-center gap-2"><Save size={18} /> Save</button>
                    <button type="button" onClick={handleEditToggle} className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-full font-bold transition flex items-center gap-2"><X size={18} /> Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-4xl font-bold mb-2">{user.name}</h2>
                  <p className="text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> {user.email}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-300">
                    {user.phone && <a href={`tel:${user.phone}`} className="flex items-center gap-1 hover:text-purple-400"><Phone size={16} /> {user.phone}</a>}
                    {user.linkedin && <a href={user.linkedin} target="_blank" className="flex items-center gap-1 hover:text-blue-500"><Linkedin size={16} /> LinkedIn</a>}
                    {user.instagram && <a href={user.instagram} target="_blank" className="flex items-center gap-1 hover:text-pink-500"><Instagram size={16} /> Instagram</a>}
                    {user.github && <a href={user.github} target="_blank" className="flex items-center gap-1 hover:text-white"><Github size={16} /> GitHub</a>}
                  </div>
                  <div className="mt-6"><button onClick={handleEditToggle} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold transition shadow-lg shadow-purple-500/30 flex items-center gap-2 mx-auto md:mx-0"><Edit2 size={18} /> Edit Profile</button></div>
                </>
              )}
            </div>
            <div className="text-center border-l border-gray-700 pl-8 min-w-[120px]">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{memories.length}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider mt-1">Memories</div>
            </div>
          </div>
        </motion.div>
        <h3 className="text-2xl font-bold mb-6">My Memories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.length > 0 ? memories.map(memory => (
            <div key={memory._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <img src={memory.image} className="w-full h-48 object-cover" />
              <div className="p-4"><p className="text-white mb-2">"{memory.message}"</p><p className="text-xs text-gray-500">{memory.category}</p></div>
            </div>
          )) : <div className="col-span-full text-center py-12 text-gray-500">No memories uploaded yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;