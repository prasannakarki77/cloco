import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { Artist, GetArtistsResponse } from "@/types";
import { API_URL } from "@/lib/utils";

interface ArtistContextProps {
  artistsRes: GetArtistsResponse | null;
  loading: boolean;
  error: string | null;
  fetchArtistData: () => void;
  page: number;
  pageSize: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
}

export const ArtistContext = createContext<ArtistContextProps>({
  artistsRes: null,
  loading: true,
  error: null,
  fetchArtistData: () => {},
  page: 1,
  pageSize: "5",
  setPage: () => {},
  setPageSize: () => {},
});

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [artistsRes, setArtistsRes] = useState<GetArtistsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("5");

  const fetchArtistData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/artist/get-all?page=${page}&pageSize=${pageSize}`
      );
      setArtistsRes(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        artistsRes,
        loading,
        error,
        fetchArtistData,
        page,
        pageSize,
        setPageSize,
        setPage,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};
