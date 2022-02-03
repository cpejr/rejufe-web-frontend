import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import * as managerService from '../services/manager/managerService';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (user?.acessToken === '' || !user?.acessToken) {
      const getStorage = JSON.parse(localStorage.getItem('user'));
      let response;
      if (getStorage?.type === 'administrator') {
        response = await managerService.getByIdAdm(getStorage.id);
        setUser({
          name: response.name,
          email: response.email,
          type: getStorage.type,
          acessToken: getStorage.acessToken,
          id: response.id,
        });
      } else if (getStorage?.type === 'usuario') {
        response = await managerService.getByIdProfessor(getStorage.id);
        setUser({
          name: response.name,
          email: response.email,
          type: getStorage.type,
          acessToken: getStorage.acessToken,
          id: response.id,
        });
      }
    }
    setLoading(false);
  }, [user]);

  const [token, setToken] = useState();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  const validateSession = async (localUser) => {
    try {
      const response = await managerService.validateSession();
      if (response.type === 'administrator') {
        setUser({
          name: response.name,
          email: response.email,
          type: response.type,
          acessToken: localUser.acessToken,
          id: response.id,
        });
      } else if (response.type === 'usuario') {
        setUser({
          name: response.name,
          email: response.email,
          type: response.type,
          acessToken: localUser.acessToken,
          id: response.id,
        });
      } 
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  };

  useEffect(() => {
    setLoading(true);
    const localUser = JSON.parse(localStorage.getItem('usuario'));
    if (localUser && (user?.accessToken === '' || !user?.accessToken)) {
      validateSession(localUser).then(() => {
        setLoading(false);
      });
    } else if (!localStorage.getItem('usuario')) {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = () => {
    const getAccessToken = JSON.parse(localStorage.getItem('usuario'));
    return getAccessToken?.accessToken !== null;
  };

  const typeAuthorized = (type, userAlt) => ((type === 'both'
    && (userAlt?.type === 'administrator' || userAlt?.type === 'professor')) || userAlt?.type === type);

  function Loading() {
    return (
      <div className="loadingAuth" style={{ width: '100vw', height: '100vh' }}>
        <div
          className="loading-logo"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={90} color="#123abc" loading />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      logout,
      isAuthenticated,
      typeAuthorized,
    }}
    >
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);