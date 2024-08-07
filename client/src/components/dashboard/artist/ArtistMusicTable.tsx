import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Music } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { API_URL, fDate } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { ArtistContext } from "@/context/ArtistContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MusicForm from "./MusicForm";
import { Button } from "@/components/ui/button";

export default function ArtistMusicTable({
  data,
  artistId,
}: {
  data: Music[];
  artistId: string;
}) {
  const { fetchArtistMusic } = useContext(ArtistContext);
  const [selectedRow, setSelectedRow] = useState<Music | undefined>();
  const { isOpen, closeModal, openModal } = useContext(ModalContext);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${API_URL}/artist/music/delete/${id}`);
      if (res.status === 200) {
        toast.success("Music deleted Successfully");
        fetchArtistMusic(artistId);
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
            <TableHead>Title</TableHead>
            <TableHead>Album Name</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.title || "--"}</TableCell>
              <TableCell>{item.album_name || "--"}</TableCell>
              <TableCell>{item.genre || "--"}</TableCell>
              <TableCell>
                {item.created_at ? fDate(item.created_at) : "--"}
              </TableCell>
              <TableCell>
                {item.updated_at ? fDate(item.updated_at) : "--"}
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
                        setSelectedRow(item);
                        openModal();
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(item.id);
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
            <DialogTitle>Add a music</DialogTitle>
          </DialogHeader>
          <MusicForm musicData={selectedRow} artistId={artistId} />
        </DialogContent>
      </Dialog>
    </>
  );
}
