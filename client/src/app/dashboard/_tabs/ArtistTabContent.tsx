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
import { ArtistContext } from "@/context/ArtistContext";
import { ModalContext } from "@/context/ModalContext";
import { useEffect, useContext } from "react";

const ArtistTabContent = () => {
  const { error, fetchArtistData, loading, artistData } =
    useContext(ArtistContext);
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchArtistData();
  }, []);

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
        <ArtistTable data={artistData} />
      </Card>
    </div>
  );
};

export default ArtistTabContent;
