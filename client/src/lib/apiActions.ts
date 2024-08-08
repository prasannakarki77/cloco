import axios, { AxiosResponse } from "axios";
import { API_URL } from "./utils";
import { UserRegistrationInput, LoginUserInput } from "@/types";

export const registerFn = async (
  input: UserRegistrationInput
): Promise<AxiosResponse> => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.post(API_URL + "/register", input, {
    headers,
  });
};

export const loginFn = async (
  input: LoginUserInput
): Promise<AxiosResponse> => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.post(API_URL + "/login", input, {
    headers,
  });
};

export const getArtistById = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/artist/get/${id}`);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};
