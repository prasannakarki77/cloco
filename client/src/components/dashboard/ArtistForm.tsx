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
import { Gender, Artist } from "@/types";
import { ModalContext } from "@/context/ModalContext";
import { ArtistContext } from "@/context/ArtistContext";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  dob: z.string().min(1, {
    message: "Date of Birth is required.",
  }),
  first_year_release: z.string().refine((val) => /^[0-9]{4}$/.test(val), {
    message: "Year must be a 4-digit number",
  }),
  no_of_album_released: z.string(),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
});

export default function ArtistForm({ artistData }: { artistData?: Artist }) {
  const { fetchArtistData } = useContext(ArtistContext);

  const { closeModal } = useContext(ModalContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: artistData?.name || "",
      gender: artistData?.gender || "",
      dob: artistData?.dob ? artistData.dob.toString() : "",
      address: artistData?.address || "",
      first_year_release: artistData?.first_year_release
        ? artistData?.first_year_release.toString()
        : "",
      no_of_album_released: artistData?.no_of_album_released
        ? artistData?.no_of_album_released.toString()
        : "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (artistData) {
        const res = await axios.put(
          `${API_URL}/artist/update`,
          { id: artistData.id, ...data },
          {}
        );
        if (res.status === 200) {
          toast.success("Artist updated successfully!");
          closeModal();
          fetchArtistData();
        }
      } else {
        const res = await axios.post(`${API_URL}/artist/create`, data, {});
        if (res.status === 201) {
          toast.success("Artist created successfully!");
          closeModal();
          fetchArtistData();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
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
                    <SelectItem value={Gender.Male}>Male</SelectItem>
                    <SelectItem value={Gender.Female}>Female</SelectItem>
                    <SelectItem value={Gender.Other}>Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input placeholder="Date of birth" {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_year_release"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First year release</FormLabel>
                <FormControl>
                  <Input placeholder="eg. 2024" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="no_of_album_released"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No of Album Released</FormLabel>
                <FormControl>
                  <Input placeholder="eg. 10" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="eg. Amatyalaya, Patan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
