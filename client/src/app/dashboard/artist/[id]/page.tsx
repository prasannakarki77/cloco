"use client";

import Loader from "@/components/common/Loader";
import ArtistMusicTable from "@/components/dashboard/artist/ArtistMusicTable";
import MusicForm from "@/components/dashboard/artist/MusicForm";
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

import React, { useContext, useEffect } from "react";

type IParams = {
  id: string;
};

const ArtistPage = ({ params }: { params: IParams }) => {
  const { fetchArtistMusic, artistMusics, loading, error } =
    useContext(ArtistContext);
  const { isOpen } = useContext(ModalContext);

  useEffect(() => {
    fetchArtistMusic(params.id);
  }, [params.id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container p-5 space-y-5">
      <div className=" flex justify-end">
        <Dialog defaultOpen={isOpen} modal>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Add a music record</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a music record</DialogTitle>
            </DialogHeader>
            <MusicForm artistId={params.id} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <ArtistMusicTable data={artistMusics || []} artistId={params.id} />
      </Card>
    </div>
  );
};

export default ArtistPage;
