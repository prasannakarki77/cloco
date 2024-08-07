import Loader from "@/components/common/Loader";
import ArtistForm from "@/components/dashboard/ArtistForm";
import ArtistTable from "@/components/dashboard/ArtistTable";
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
import { ArtistContext } from "@/context/ArtistContext";
import { ModalContext } from "@/context/ModalContext";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { FileDownIcon, FileSpreadsheetIcon } from "lucide-react";
import { headers } from "next/headers";
import { useEffect, useContext, useState } from "react";

const ArtistTabContent = () => {
  const [message, setMessage] = useState<string>("");

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

  const handleUpload = async (file: File) => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/artist/import-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      fetchArtistData();
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_URL}/artist/export-csv`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "artists.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting artists:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" space-y-4 mt-4">
      <div className=" flex justify-between">
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
        <div className=" flex justify-end gap-2">
          <Button
            variant={"secondary"}
            onClick={handleExport}
            className=" flex items-center gap-1"
          >
            <FileDownIcon size={20} /> Download CSV
          </Button>
          <Button asChild variant={"secondary"}>
            <label
              htmlFor="upload-button"
              className="cursor-pointer  flex items-center gap-1"
            >
              <FileSpreadsheetIcon size={20} /> Import CSV
            </label>
          </Button>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="csv"
          />
        </div>
      </div>

      <Card>
        <ArtistTable data={artistsRes?.data || []} />
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
