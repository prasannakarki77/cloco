export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Genre {
  Rnb = "rnb",
  Country = "country",
  Jazz = "jazz",
  Classic = "classic",
  Rock = "rock",
}

export type UserRegistrationInput = {
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  password: string;
  dob: string;
  gender: Gender;
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

export interface Artist {
  id?: number;
  name: string;
  gender: Gender;
  address: string;
  dob: Date;
  first_year_release: number;
  no_of_album_released: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Music {
  artist_id: number;
  title: string;
  album_name: string;
  genre: Genre;
  created_at?: Date;
  updated_at?: Date;
}
