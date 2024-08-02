export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  address?: string;
  dob?: Date;
  created_at?: Date;
  updated_at?: Date;
}
