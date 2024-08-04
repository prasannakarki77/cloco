export type UserRegistrationInput = {
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone?: string;
  gender?: string;
  address?: string;
  dob?: Date;
  created_at?: Date;
  updated_at?: Date;
}
