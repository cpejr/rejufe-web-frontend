import React, { useState, useEffect } from 'react';
import * as managerService from '../services/manager/managerService';
import LinearColor from '../components/Loading/Loading';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  console.log(user);

  async function logIn() {
    try {
      if (user?.acessToken === '' || !user?.acessToken) {
        const getStorage = JSON.parse(localStorage.getItem('user'));
        if (getStorage?.id) {
          try {
            const response = await managerService.getById(getStorage?.id);
            setUser({
              name: response?.name,
              email: response?.email,
              type: response?.type,
              acessToken: getStorage.acessToken,
              id: response?._id,
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error); // TO DO: Substitute for redirect to not Found when done
            setLoading(false);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    logIn();
  }, [user]);

  const [token, setToken] = useState();

  const isAuthenticated = () => {
    const getAccessToken = JSON.parse(localStorage.getItem('user'));
    return getAccessToken?.accessToken !== null;
  };

  const typeAuthorized = (type, userAlt) => ((type === 'usuario'
    && (userAlt?.type === 'administrador' || userAlt?.type === 'usuario')) || userAlt?.type === type);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function Loading() {
    return (
      <LinearColor />
    );
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser,
        isAuthenticated,
        typeAuthorized,
        token,
        setToken,
        logout,
      }}
    >
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
