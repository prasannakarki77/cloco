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
import { UserContext } from "@/context/UserContext";
import { User, Gender } from "@/types";

const FormSchema = z.object({
  first_name: z.string().min(2, {
    message: "first_name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "last_name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits long",
  }),

  dob: z.string().min(1, {
    message: "Date of Birth is required.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
});

export default function UserForm({ userData }: { userData?: User }) {
  const { fetchUsersData, setOpenUserFormModal } = useContext(UserContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      email: userData?.email || "",
      gender: userData?.gender || "",
      dob: userData?.dob ? userData.dob.toString() : "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (userData) {
        const res = await axios.put(
          `${API_URL}/user/update`,
          { id: userData.id, ...data },
          {}
        );
        if (res.status === 200) {
          toast.success("User updated successfully!");
          setOpenUserFormModal(false);
          fetchUsersData();
        }
      } else {
        const res = await axios.post(`${API_URL}/user/create`, data, {});
        if (res.status === 201) {
          toast.success("User created successfully!");
          setOpenUserFormModal(false);
          fetchUsersData();
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="eg. John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg johndoe@gmail.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 9867844564"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="eg Amatyalaya, Patan" {...field} />
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
