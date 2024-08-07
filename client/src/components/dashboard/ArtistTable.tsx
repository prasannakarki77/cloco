import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Artist } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { API_URL, fDate } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { ModalContext } from "@/context/ModalContext";
import { ArtistContext } from "@/context/ArtistContext";
import ArtistForm from "./ArtistForm";

export default function ArtistTable({ data }: { data: Artist[] }) {
  const { fetchArtistData } = useContext(ArtistContext);
  const [selectedRow, setSelectedRow] = useState<Artist | undefined>();
  const { isOpen, closeModal, openModal } = useContext(ModalContext);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${API_URL}/artist/delete/${id}`);
      if (res.status === 200) {
        toast.success("Artist deleted Successfully");
        fetchArtistData();
      }
    } catch (error: any) {
      toast.error(error.res?.data?.message || "Failed to delete data");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>First Year Release</TableHead>
            <TableHead>No of Albums</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name || "--"}</TableCell>
              <TableCell>{user.dob ? fDate(user.dob) : "--"}</TableCell>
              <TableCell>{user.gender || "--"}</TableCell>
              <TableCell>{user.first_year_release || "--"}</TableCell>
              <TableCell>{user.no_of_album_released || "--"}</TableCell>
              <TableCell>
                {user.created_at ? fDate(user.created_at) : "--"}
              </TableCell>
              <TableCell>
                {user.updated_at ? fDate(user.updated_at) : "--"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedRow(user);
                        openModal();
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an Artist</DialogTitle>
          </DialogHeader>
          <ArtistForm artistData={selectedRow} />
        </DialogContent>
      </Dialog>
    </>
  );
}
