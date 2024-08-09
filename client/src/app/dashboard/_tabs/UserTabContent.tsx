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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import React, { useEffect, useContext } from "react";

const UserTabContent = () => {
  const {
    error,
    fetchUsersData,
    loading,
    usersRes,
    setPage,
    page,
    pageSize,
    setPageSize,
  } = useContext(UserContext);
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchUsersData();
  }, [page, pageSize]);

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
        <UserTable data={usersRes?.data || []} />
      </Card>
      <div className="space-x-2 flex gap-1 justify-end items-center">
        <Select
          value={pageSize}
          onValueChange={(val) => {
            setPageSize(val);
            setPage(1);
          }}
          defaultValue={pageSize}
        >
          <SelectTrigger className="w-[60px] min-w-fit">
            {pageSize}
          </SelectTrigger>
          <SelectContent className="min-w-fit">
            <SelectGroup className=" min-w-fit text-center justify-center">
              <SelectItem
                value="5"
                className=" min-w-fit text-center justify-center"
              >
                5
              </SelectItem>
              <SelectItem value="10" className=" min-w-fit">
                10
              </SelectItem>
              <SelectItem value="20" className="min-w-fit">
                20
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((page) => page - 1)}
          disabled={!usersRes?.hasPrevPage}
        >
          Previous
        </Button>
        <div className="">
          {usersRes?.page}
          <span className="text-gray-400 "> of {usersRes?.totalPages}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((page) => page + 1)}
          disabled={!usersRes?.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserTabContent;
