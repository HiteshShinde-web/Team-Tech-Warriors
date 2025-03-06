// context/UserDetailContext.js
import React, { createContext, useState, useContext } from "react";

const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCourses, setHasCourses] = useState(false);

  return (
    <UserDetailContext.Provider
      value={{ userDetail, setUserDetail, loading, setLoading, hasCourses, setHasCourses }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

// Custom hook for easy access
export const useUserDetail = () => useContext(UserDetailContext);

export { UserDetailContext };