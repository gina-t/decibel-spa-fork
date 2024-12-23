import { useContext } from "react";
import { AcceptedUsersContext, AcceptedUsersContextProps } from "../context/AcceptedUsersContext";

export const useAcceptedUsers = (): AcceptedUsersContextProps => {
  const context = useContext(AcceptedUsersContext);
  if (!context) {
    throw new Error("useAcceptedUsers must be used within an AcceptedUsersProvider");
  }
  return context;
};
