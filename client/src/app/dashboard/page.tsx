"use client";

import AuthGuard from "@/components/common/AuthGuard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import UserTabContent from "./_tabs/UserTabContent";
import { UserProvider } from "@/context/UserContext";
import ArtistTabContent from "./_tabs/ArtistTabContent";

const DashboardPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <AuthGuard>
      <UserProvider>
        <div className="container p-5">
          <div className=" flex justify-between">
            <h1 className=" text-2xl  font-bold">
              Welcome to dashboard, Admin
            </h1>
            <Button onClick={handleLogout}>Logout</Button>
          </div>

          <div className=" mt-6">
            <Tabs defaultValue="user" className="">
              <TabsList className="grid  grid-cols-2 w-[400px]">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="artist">Artist</TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <UserTabContent />
              </TabsContent>
              <TabsContent value="artist">
                <ArtistTabContent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </UserProvider>
    </AuthGuard>
  );
};

export default DashboardPage;
