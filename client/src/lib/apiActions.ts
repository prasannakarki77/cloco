import axios, { AxiosResponse } from "axios";
import { API_URL } from "./utils";
import { LoginUserInput, UserRegistrationInput } from "@/types";

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
