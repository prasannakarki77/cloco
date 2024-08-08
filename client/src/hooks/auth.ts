import { jwtDecode } from "@/lib/utils";

export const useGetAuth = () => {
  let token;
  let first_name;
  let last_name;
  let email;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token) {
    const tokenJsonValue = jwtDecode(token);
    first_name = tokenJsonValue.first_name;
    last_name = tokenJsonValue.last_name;
    email = tokenJsonValue.email;
  }
  return {
    token,
    first_name,
    last_name,
    email,
  };
};
