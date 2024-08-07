"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { toast } from "sonner";
import { useContext } from "react";
import { Genre, Music } from "@/types";
import { ModalContext } from "@/context/ModalContext";
import { ArtistContext } from "@/context/ArtistContext";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  album_name: z.string().min(2, {
    message: "Album name is required.",
  }),
  genre: z.string().min(1, {
    message: "Genre is required.",
  }),
});

export default function MusicForm({
  musicData,
  artistId,
}: {
  musicData?: Music;
  artistId: string;
}) {
  const { fetchArtistMusic } = useContext(ArtistContext);

  const { closeModal } = useContext(ModalContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      album_name: musicData?.album_name,
      genre: musicData?.genre,
      title: musicData?.title,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (musicData) {
        const res = await axios.put(
          `${API_URL}/artist/music/update`,
          { id: musicData.id, ...data },
          {}
        );
        if (res.status === 200) {
          toast.success("Artist updated successfully!");
          closeModal();
          fetchArtistMusic(artistId);
        }
      } else {
        const res = await axios.post(
          `${API_URL}/artist/music/create`,
          { ...data, artist_id: artistId },
          {}
        );
        if (res.status === 201) {
          toast.success("Music created successfully!");
          closeModal();
          fetchArtistMusic(artistId);
        }
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="eg. title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. album name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Genre.Classic}>Classic</SelectItem>
                    <SelectItem value={Genre.Country}>Country</SelectItem>
                    <SelectItem value={Genre.Jazz}>Jazz</SelectItem>
                    <SelectItem value={Genre.Rnb}>Rnb</SelectItem>
                    <SelectItem value={Genre.Rock}>Rock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
