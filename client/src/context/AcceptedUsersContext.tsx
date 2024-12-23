import React, { createContext, useState, ReactNode } from "react";
import { UserLogin } from "../interfaces/UserLogin";

// Define the shape of the context value
export interface AcceptedUsersContextProps {
  acceptedUsers: UserLogin[];
  addAcceptedUser: (user: UserLogin) => void;
  removeAcceptedUser: (userId: number) => void;
}

// Create the context with an initial value of undefined
const AcceptedUsersContext = createContext<AcceptedUsersContextProps | undefined>(undefined);

// Define the provider component
export const AcceptedUsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [acceptedUsers, setAcceptedUsers] = useState<UserLogin[]>([]);

  // Function to add a user to the accepted users list
  const addAcceptedUser = (user: UserLogin) => {
    setAcceptedUsers((prevUsers) => [...prevUsers, user]);
  };

  // Function to remove a user from the accepted users list
  const removeAcceptedUser = (userId: number) => {
    setAcceptedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Provide the context value to children components
  return (
    <AcceptedUsersContext.Provider value={{ acceptedUsers, addAcceptedUser, removeAcceptedUser }}>
      {children}
    </AcceptedUsersContext.Provider>
  );
};

// Export the context separately
export { AcceptedUsersContext };
