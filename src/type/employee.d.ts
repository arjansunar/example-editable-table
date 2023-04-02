import { Store } from "./store";

export interface Employee {
  id: number;
  store?: Store;
  secondary_store: SecondaryStore[];
  created_date: string;
  modified_date: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  user: number;
  role?: string;
}

interface SecondaryStore {
  id: number;
  created_date: string;
  modified_date: string;
  name: string;
  location: string;
  phone_number: string;
  pack: number;
  omvic: number;
  clean_fee: number;
  target_value: string;
  plan: number;
}
