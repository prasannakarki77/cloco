import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { GetUsersResponse, User } from "@/types";
import { API_URL } from "@/lib/utils";

interface UserContextProps {
  usersRes: GetUsersResponse | null;
  loading: boolean;
  error: string | null;
  fetchUsersData: () => void;
  page: number;
  pageSize: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
  usersRes: null,
  loading: true,
  error: null,
  fetchUsersData: () => {},
  page: 1,
  pageSize: "5",
  setPage: () => {},
  setPageSize: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersRes, setUsersRes] = useState<GetUsersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openUserFormModal, setOpenUserFormModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("5");

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/user/get-all?page=${page}&pageSize=${pageSize}`
      );
      setUsersRes(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        usersRes,
        loading,
        error,
        fetchUsersData,
        page,
        pageSize,
        setPageSize,
        setPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
