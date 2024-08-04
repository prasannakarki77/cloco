import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function UserTable({ data }: { data: User[] }) {
  const { fetchUsersData } = useContext(UserContext);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/user/delete/${id}`);
      if (res.status === 200) {
        toast.success("User deleted Successfully");
        fetchUsersData();
      }
    } catch (error: any) {
      toast.error(error.res?.data?.message || "Failed to delete data");
    }
  };

  return (
    <Table>
      {/* <TableCaption>A list of your recent users.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.first_name || "--"}</TableCell>
            <TableCell>{user.last_name || "--"}</TableCell>
            <TableCell>{user.email || "--"}</TableCell>
            <TableCell>{user.phone || "--"}</TableCell>
            <TableCell>{user.dob?.toString() || "--"}</TableCell>
            <TableCell>{user.gender || "--"}</TableCell>
            <TableCell>{user.created_at?.toString() || "--"}</TableCell>
            <TableCell>{user.updated_at?.toString() || "--"}</TableCell>
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
                  <DropdownMenuItem>Update</DropdownMenuItem>
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
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
