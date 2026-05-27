import {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import api from '../services/api';

const AdminDashboard = () => {

  const navigate =
    useNavigate();

  const [stats, setStats] =
    useState({});

  const [users, setUsers] =
    useState([]);

  const [memories, setMemories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

          // admin protection

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

          setStats(
            statsRes.data
          );

          setUsers(
            usersRes.data
          );

          setMemories(
            memoriesRes.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAdminData();

  }, []);

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
            (u) => u._id !== id
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
            (m) => m._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

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

      </div>

      {/* USERS */}

      <div className="bg-gray-800 rounded-2xl p-6 mb-10 border border-gray-700 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">

          Users Management

        </h2>

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

            {users.map((user) => (

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

                    className="w-10 h-10 rounded-full"
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

            ))}

          </tbody>

        </table>

      </div>

      {/* MEMORIES */}

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">

          Memories Management

        </h2>

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

            {memories.map((memory) => (

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

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminDashboard;