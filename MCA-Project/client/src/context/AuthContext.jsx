import React, {
  createContext,
  useState,
  useEffect
} from 'react';

export const AuthContext =
  createContext();

export const AuthProvider =
({ children }) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ================= LOAD USER =================

  useEffect(() => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            'userInfo'
          )
        );

      if (
        userInfo &&
        userInfo.token
      ) {

        setUser(userInfo.user);

      }

    } catch (error) {

      console.log(error);

      localStorage.removeItem(
        'userInfo'
      );

    }

    setLoading(false);

  }, []);

  // ================= LOGIN =================

  const loginUser = (
    data
  ) => {

    localStorage.setItem(
      'userInfo',
      JSON.stringify(data)
    );

    setUser(data.user);

  };

  // ================= LOGOUT =================

  const logoutUser = () => {

    localStorage.removeItem(
      'userInfo'
    );

    setUser(null);

  };

  // ================= UPDATE USER =================

  const updateUser = (
    updatedUser
  ) => {

    setUser(updatedUser);

    const userInfo =
      JSON.parse(
        localStorage.getItem(
          'userInfo'
        )
      );

    if (userInfo) {

      userInfo.user =
        updatedUser;

      localStorage.setItem(
        'userInfo',
        JSON.stringify(userInfo)
      );

    }

  };

  return (

    <AuthContext.Provider
      value={{

        user,
        setUser,

        loginUser,
        logoutUser,

        updateUser,

        loading

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};