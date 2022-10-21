import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import * as managerService from '../services/manager/managerService';
import LinearColor from '../components/Loading/Loading';

export const AuthContext = React.createContext({});

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { isExpired } = useJwt(sessionStorage.getItem('@token'));
  const history = useHistory();

  async function login() {
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
            console.error(error);
            routingFunction();
            setLoading(false);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    login();
  }, [user]);

  const [token, setToken] = useState();

  const isAuthenticated = () => {
    if (isExpired) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('@token');
    }
    return !isExpired;
  };
  const typeAuthorized = (type, userAlt) => ((type === 'usuario'
    && (userAlt?.type === 'administrador' || userAlt?.type === 'usuario')) || userAlt?.type === type);

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('@token');
    setUser(null);
    setToken(null);
    setLoading(false);
    history.push('/login');
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
