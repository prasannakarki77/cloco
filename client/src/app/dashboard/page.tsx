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
      <div className="container p-5">
        <h1>Welcome to dashboard</h1>
        <div className=" flex justify-end">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
