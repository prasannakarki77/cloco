"use client";

import { ArtistProvider } from "@/context/ArtistContext";
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ArtistProvider>
        <ModalProvider>{children}</ModalProvider>
      </ArtistProvider>
    </UserProvider>
  );
};

export default Provider;
