import { createContext, useState, useContext } from 'react';

const CardGenatorContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  const addProfile = (profileData) => {
    setProfiles(prev => [...prev, profileData]);
  };

  return (
    <CardGenatorContext.Provider value={{ profiles, addProfile }}>
      {children}
    </CardGenatorContext.Provider>
  );
};

export const useProfile = () => useContext(CardGenatorContext);