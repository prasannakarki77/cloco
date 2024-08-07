import Loader from "@/components/common/Loader";
import UserForm from "@/components/dashboard/UserForm";
import UserTable from "@/components/dashboard/UserTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import React, { useEffect, useContext } from "react";

const UserTabContent = () => {
  const { error, fetchUsersData, loading, usersData } = useContext(UserContext);
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchUsersData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" space-y-4">
      <div className=" flex justify-end">
        <Dialog defaultOpen={isOpen} modal>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Create User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a User</DialogTitle>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <UserTable data={usersData} />
      </Card>
    </div>
  );
};

export default UserTabContent;
