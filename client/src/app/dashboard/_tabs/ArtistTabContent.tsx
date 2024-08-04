import ArtistForm from "@/components/dashboard/ArtistForm";
import ArtistTable from "@/components/dashboard/ArtistTable";
import UserForm from "@/components/dashboard/UserForm";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtistContext } from "@/context/ArtistContext";
import { ModalContext } from "@/context/ModalContext";
import { useEffect, useContext, useState } from "react";

const ArtistTabContent = () => {
  const {
    error,
    fetchArtistData,
    loading,
    artistsRes,
    setPage,
    page,
    pageSize,
    setPageSize,
  } = useContext(ArtistContext);
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchArtistData();
  }, [page, pageSize]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" space-y-4">
      <div className=" flex justify-end">
        <Dialog defaultOpen={isOpen} modal>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Add an Artist</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an Artist</DialogTitle>
            </DialogHeader>
            <ArtistForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <ArtistTable data={artistsRes?.data || []} />
      </Card>
      <div className="space-x-2 flex gap-1 justify-end items-center">
        <Select
          value={pageSize}
          onValueChange={setPageSize}
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
          disabled={!artistsRes?.hasPrevPage}
        >
          Previous
        </Button>
        <div className="">
          {artistsRes?.page}
          <span className="text-gray-400 "> of {artistsRes?.totalPages}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((page) => page + 1)}
          disabled={!artistsRes?.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ArtistTabContent;
