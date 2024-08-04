import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { Artist } from "@/types";
import { API_URL } from "@/lib/utils";

interface ArtistContextProps {
  artistData: Artist[];
  loading: boolean;
  error: string | null;
  fetchArtistData: () => void;
}

export const ArtistContext = createContext<ArtistContextProps>({
  artistData: [],
  loading: true,
  error: null,
  fetchArtistData: () => {},
});

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/artist/get-all`);
      setArtistData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        artistData,
        loading,
        error,
        fetchArtistData,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};
