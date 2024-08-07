import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { GetArtistsResponse, Music } from "@/types";
import { API_URL } from "@/lib/utils";

interface ArtistContextProps {
  artistsRes: GetArtistsResponse | null;
  artistMusics: Music[] | null;
  loading: boolean;
  error: string | null;
  fetchArtistData: () => void;
  fetchArtistMusic: (id: string) => void;
  page: number;
  pageSize: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
}

export const ArtistContext = createContext<ArtistContextProps>({
  artistsRes: null,
  artistMusics: null,
  loading: true,
  error: null,
  fetchArtistData: () => {},
  fetchArtistMusic: () => {},
  page: 1,
  pageSize: "5",
  setPage: () => {},
  setPageSize: () => {},
});

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [artistsRes, setArtistsRes] = useState<GetArtistsResponse | null>(null);
  const [artistMusics, setArtistMusics] = useState<Music[] | null>(null);

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

  const fetchArtistMusic = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/artist/music/get-all/${id}`);
      setArtistMusics(res.data.musics);
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
        fetchArtistMusic,
        artistMusics,
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
