"use client";

import AuthGuard from "@/components/common/AuthGuard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <AuthGuard>
      <div>
        <div className=" flex justify-between">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <h1>Welcome to dashboard</h1>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
