"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        localStorage.clear();
        router.push("/");
        return;
      } else {
        router.push("/dashboard");
      }

      setAuthorized(true);
    }
  }, [router]);

  if (authorized) return <>{children}</>;
};
export default AuthGuard;
