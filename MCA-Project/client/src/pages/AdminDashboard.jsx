import {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  Search,
  MessageSquare
} from 'lucide-react';

import { format }
from 'timeago.js';

import api
from '../services/api';

const AdminDashboard = () => {

  const navigate =
    useNavigate();

  // ================= STATES =================

  const [stats, setStats] =
    useState({});

  const [users, setUsers] =
    useState([]);

  const [memories, setMemories] =
    useState([]);

  const [feedbacks, setFeedbacks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [userSearch, setUserSearch] =
    useState('');

  const [memorySearch, setMemorySearch] =
    useState('');

  const [sortType, setSortType] =
    useState('latest');

  // ================= FETCH DATA =================

  useEffect(() => {

    const fetchAdminData =
      async () => {

        try {

          const userInfo =
            JSON.parse(

              localStorage.getItem(
                'userInfo'
              )

            );

          // ADMIN PROTECTION

          if (

            userInfo?.user?.role
            !==
            'admin'

          ) {

            navigate('/');

            return;

          }

          const statsRes =
            await api.get(
              '/admin/stats'
            );

          const usersRes =
            await api.get(
              '/admin/users'
            );

          const memoriesRes =
            await api.get(
              '/admin/memories'
            );

          const feedbackRes =
            await api.get(
              '/feedback/all'
            );

          setStats(
            statsRes.data
          );

          setUsers(
            usersRes.data
          );

          setMemories(
            memoriesRes.data
          );

          setFeedbacks(
            feedbackRes.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAdminData();

  }, []);

  // ================= FILTER USERS =================

  const filteredUsers =
    useMemo(() => {

      let filtered =
        users.filter(

          (user) =>

            user.name
              ?.toLowerCase()
              .includes(
                userSearch.toLowerCase()
              )

            ||

            user.enrollment
              ?.toLowerCase()
              .includes(
                userSearch.toLowerCase()
              )

        );

      // SORTING

      if (
        sortType === 'name-asc'
      ) {

        filtered.sort(

          (a, b) =>

            a.name.localeCompare(
              b.name
            )

        );

      }

      if (
        sortType === 'name-desc'
      ) {

        filtered.sort(

          (a, b) =>

            b.name.localeCompare(
              a.name
            )

        );

      }

      if (
        sortType === 'enrollment'
      ) {

        filtered.sort(

          (a, b) =>

            a.enrollment.localeCompare(
              b.enrollment
            )

        );

      }

      return filtered;

    }, [

      users,

      userSearch,

      sortType

    ]);

  // ================= FILTER MEMORIES =================

  const filteredMemories =
    memories.filter(

      (memory) =>

        memory.userId?.name
          ?.toLowerCase()

          .includes(
            memorySearch.toLowerCase()
          )

    );

  // ================= DELETE USER =================

  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Delete this user?'
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/admin/user/${id}`
        );

        setUsers(

          users.filter(
            (u) =>
              u._id !== id
          )

        );

      } catch (error) {

        console.log(error);

      }

    };

  // ================= DELETE MEMORY =================

  const deleteMemory =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Delete this memory?'
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/admin/memory/${id}`
        );

        setMemories(

          memories.filter(
            (m) =>
              m._id !== id
          )

        );

      } catch (error) {

        console.log(error);

      }

    };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="text-center mt-20 text-xl">

        Loading Admin Panel...

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* TITLE */}

      <h1 className="text-4xl font-bold mb-8 text-purple-400">

        Admin Dashboard

      </h1>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">

          <h2 className="text-gray-400 mb-2">

            Total Users

          </h2>

          <p className="text-4xl font-bold">

            {stats.totalUsers || 0}

          </p>

        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">

          <h2 className="text-gray-400 mb-2">

            Total Memories

          </h2>

          <p className="text-4xl font-bold">

            {stats.totalMemories || 0}

          </p>

        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">

          <h2 className="text-gray-400 mb-2">

            Total Suggestions

          </h2>

          <p className="text-4xl font-bold">

            {feedbacks.length || 0}

          </p>

        </div>

      </div>

      {/* USERS */}

      <div className="bg-gray-800 rounded-2xl p-6 mb-10 border border-gray-700 overflow-x-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold">

            Users Management

          </h2>

          <div className="flex gap-3 flex-wrap">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input

                type="text"

                placeholder="Search user..."

                value={userSearch}

                onChange={(e) =>
                  setUserSearch(
                    e.target.value
                  )
                }

                className="bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-2 outline-none"

              />

            </div>

            {/* SORT */}

            <select

              value={sortType}

              onChange={(e) =>
                setSortType(
                  e.target.value
                )
              }

              className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none"

            >

              <option value="latest">
                Latest
              </option>

              <option value="name-asc">
                Name A-Z
              </option>

              <option value="name-desc">
                Name Z-A
              </option>

              <option value="enrollment">
                Enrollment
              </option>

            </select>

          </div>

        </div>

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="pb-3">
                User
              </th>

              <th className="pb-3">
                Email
              </th>

              <th className="pb-3">
                Enrollment
              </th>

              <th className="pb-3">
                Role
              </th>

              <th className="pb-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map(
              (user) => (

                <tr
                  key={user._id}
                  className="border-b border-gray-700"
                >

                  <td className="py-4 flex items-center gap-2">

                    <img

                      src={
                        user.profileImage
                      }

                      alt="user"

                      className="w-10 h-10 rounded-full object-cover"

                    />

                    {user.name}

                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.enrollment}
                  </td>

                  <td>

                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.role ===
                        'admin'

                          ? 'bg-purple-600'

                          : 'bg-gray-700'
                      }`}
                    >

                      {user.role}

                    </span>

                  </td>

                  <td>

                    {user.role !==
                      'admin' && (

                      <button

                        onClick={() =>
                          deleteUser(
                            user._id
                          )
                        }

                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"

                      >

                        Delete

                      </button>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* MEMORIES */}

      <div className="bg-gray-800 rounded-2xl p-6 mb-10 border border-gray-700 overflow-x-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold">

            Memories Management

          </h2>

          {/* MEMORY SEARCH */}

          <div className="relative">

            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input

              type="text"

              placeholder="Search memory user..."

              value={memorySearch}

              onChange={(e) =>
                setMemorySearch(
                  e.target.value
                )
              }

              className="bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-2 outline-none"

            />

          </div>

        </div>

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="pb-3">
                Image
              </th>

              <th className="pb-3">
                User
              </th>

              <th className="pb-3">
                Category
              </th>

              <th className="pb-3">
                Date
              </th>

              <th className="pb-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredMemories.map(
              (memory) => (

                <tr
                  key={memory._id}
                  className="border-b border-gray-700"
                >

                  <td className="py-4">

                    <img

                      src={memory.image}

                      alt="memory"

                      className="w-20 h-20 object-cover rounded-lg"

                    />

                  </td>

                  <td>

                    {
                      memory.userId
                        ?.name
                    }

                  </td>

                  <td>

                    {memory.category}

                  </td>

                  <td>

                    {new Date(
                      memory.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    <button

                      onClick={() =>
                        deleteMemory(
                          memory._id
                        )
                      }

                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* FEEDBACK SECTION */}

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">

        <div className="flex items-center gap-2 mb-6">

          <MessageSquare
            size={22}
            className="text-purple-400"
          />

          <h2 className="text-2xl font-bold">

            User Suggestions

          </h2>

        </div>

        <div className="space-y-5">

          {feedbacks.length === 0 ? (

            <p className="text-gray-400">

              No suggestions yet.

            </p>

          ) : (

            feedbacks.map(
              (feedback) => (

                <div

                  key={feedback._id}

                  className="bg-gray-900 border border-gray-700 rounded-2xl p-5"

                >

                  <div className="flex items-center gap-3 mb-3">

                    <img

                      src={
                        feedback.userId
                          ?.profileImage ||

                        "/default.png"
                      }

                      alt="profile"

                      className="w-11 h-11 rounded-full object-cover border border-purple-500"

                    />

                    <div>

                      <h3 className="font-semibold">

                        {
                          feedback.userId
                            ?.name
                        }

                      </h3>

                      <p className="text-xs text-gray-400">

                        {format(
                          feedback.createdAt
                        )}

                      </p>

                    </div>

                  </div>

                  <p className="text-gray-300 leading-relaxed break-words">

                    {feedback.message}

                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;