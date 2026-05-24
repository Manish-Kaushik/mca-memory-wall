import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <nav className="bg-gray-800/80 backdrop-blur border-b border-gray-700 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-400">MCA Wall</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/wall" className="hover:text-purple-400">Wall</Link>
              <Link to="/upload" className="hover:text-purple-400">Upload</Link>
              <Link to="/profile" className="hover:text-purple-400">Profile</Link>
              <button onClick={handleLogout} className="text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-400">Login</Link>
              <Link to="/register" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;