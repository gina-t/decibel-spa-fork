import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserLogin } from "../interfaces/UserLogin";

interface AcceptedUsersContextProps {
  acceptedUsers: UserLogin[];
  addAcceptedUser: (user: UserLogin) => void;
  removeAcceptedUser: (userId: number) => void;
}

const AcceptedUsersContext = createContext<AcceptedUsersContextProps | undefined>(undefined);

export const AcceptedUsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [acceptedUsers, setAcceptedUsers] = useState<UserLogin[]>([]);

  const addAcceptedUser = (user: UserLogin) => {
    setAcceptedUsers((prevUsers) => [...prevUsers, user]);
  };

  const removeAcceptedUser = (userId: number) => {
    setAcceptedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <AcceptedUsersContext.Provider value={{ acceptedUsers, addAcceptedUser, removeAcceptedUser }}>
      {children}
    </AcceptedUsersContext.Provider>
  );
};

export const useAcceptedUsers = () => {
  const context = useContext(AcceptedUsersContext);
  if (!context) {
    throw new Error("useAcceptedUsers must be used within an AcceptedUsersProvider");
  }
  return context;
};
