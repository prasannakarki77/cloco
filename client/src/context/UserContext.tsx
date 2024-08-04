import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import { User } from "@/types";
import { API_URL } from "@/lib/utils";

interface UserContextProps {
  usersData: User[];
  loading: boolean;
  error: string | null;
  fetchUsersData: () => void;
  openUserFormModal: boolean;
  setOpenUserFormModal: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  usersData: [],
  loading: true,
  error: null,
  fetchUsersData: () => {},
  openUserFormModal: false,
  setOpenUserFormModal: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openUserFormModal, setOpenUserFormModal] = useState<boolean>(false);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/user/get-all`);
      setUsersData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        usersData,
        loading,
        error,
        fetchUsersData,
        setOpenUserFormModal,
        openUserFormModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
