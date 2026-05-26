import { Link, useLocation } from "react-router-dom";

import { useContext, useState } from "react";

import {
  Menu,
  X,
  Sparkles
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const {
    user,
    logoutUser
  } = useContext(AuthContext);

  const location =
    useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {

    logoutUser();

  };

  const navLink =
    "hover:text-purple-400 transition duration-300";

  const activeLink =
    "text-purple-400 font-semibold";

  return (

    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#071028]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">

            <Sparkles size={18} />

          </div>

          <div>

            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">

              MCA Memory Wall

            </h1>

            <p className="text-xs text-gray-400">

              Batch 2024–26

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          {user ? (

            <>

              <Link
                to="/wall"
                className={`${navLink} ${
                  location.pathname === "/wall"
                    ? activeLink
                    : ""
                }`}
              >

                Memories

              </Link>

              <Link
                to="/upload"
                className={`${navLink} ${
                  location.pathname === "/upload"
                    ? activeLink
                    : ""
                }`}
              >

                Upload

              </Link>

              <Link
                to="/profile"
                className={`${navLink} ${
                  location.pathname === "/profile"
                    ? activeLink
                    : ""
                }`}
              >

                Profile

              </Link>

              {user?.role === "admin" && (

                <Link
                  to="/admin"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
                >

                  Admin

                </Link>

              )}

              <button
                onClick={handleLogout}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition duration-300"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/"
                className={`${navLink} ${
                  location.pathname === "/"
                    ? activeLink
                    : ""
                }`}
              >

                Home

              </Link>

              <Link
                to="/wall"
                className={`${navLink} ${
                  location.pathname === "/wall"
                    ? activeLink
                    : ""
                }`}
              >

                Memories

              </Link>

              <Link
                to="/login"
                className={`${navLink} ${
                  location.pathname === "/login"
                    ? activeLink
                    : ""
                }`}
              >

                Login

              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/30"
              >

                Register

              </Link>

            </>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }

          className="md:hidden"
        >

          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#09142d] border-t border-white/10">

          {user ? (

            <>

              <Link
                to="/wall"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Memories

              </Link>

              <Link
                to="/upload"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Upload

              </Link>

              <Link
                to="/profile"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Profile

              </Link>

              {user?.role === "admin" && (

                <Link
                  to="/admin"
                  className="text-yellow-400"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >

                  Admin

                </Link>

              )}

              <button
                onClick={() => {

                  handleLogout();

                  setMenuOpen(false);

                }}

                className="text-left text-red-400"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Home

              </Link>

              <Link
                to="/wall"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Memories

              </Link>

              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Login

              </Link>

              <Link
                to="/register"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Register

              </Link>

            </>

          )}

        </div>

      )}

    </nav>

  );

};

export default Navbar;