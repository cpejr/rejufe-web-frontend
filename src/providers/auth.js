import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import * as managerService from '../services/manager/managerService';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    if (user?.acessToken === '' || !user?.acessToken) {
      const getStorage = JSON.parse(localStorage.getItem('user'));
      if (getStorage?.id) {
        try {
          const response = await managerService.getById(getStorage?.id);
          console.log(response);
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
  }, [user]);

  const [token, setToken] = useState();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
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
          <CircularProgress size={90} color="#264A6F" loading />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser,
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
