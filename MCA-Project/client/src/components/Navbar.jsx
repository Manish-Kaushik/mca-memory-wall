import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const {
    user,
    logoutUser
  } = useContext(AuthContext);

  const handleLogout = () => {

    logoutUser();

  };

  return (

    <nav className="bg-gray-800/80 backdrop-blur border-b border-gray-700 p-4 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-xl font-bold text-purple-400"
        >

          MCA Wall

        </Link>

        <div className="space-x-4 flex items-center">

          {user ? (

            <>

              <Link
                to="/wall"
                className="hover:text-purple-400"
              >

                Wall

              </Link>

              <Link
                to="/upload"
                className="hover:text-purple-400"
              >

                Upload

              </Link>

              <Link
                to="/profile"
                className="hover:text-purple-400"
              >

                Profile

              </Link>

              {/* ADMIN LINK */}

              {user?.role === "admin" && (

                <Link
                  to="/admin"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold"
                >

                  Admin

                </Link>

              )}

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="hover:text-purple-400"
              >

                Login

              </Link>

              <Link
                to="/register"
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500"
              >

                Register

              </Link>

            </>

          )}

        </div>

      </div>

    </nav>

  );

};

export default Navbar;