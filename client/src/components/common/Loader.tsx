import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className=" w-full flex justify-center h-[40vh]">
      <LoaderCircleIcon className=" animate-spin" />
    </div>
  );
};

export default Loader;
