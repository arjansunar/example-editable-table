export interface Store {
  id: number;
  general_manager: GeneralManager;
  plan: Plan;
  created_date: string;
  modified_date: string;
  name: string;
  location: string;
  phone_number: string;
  pack: number;
  omvic: number;
  clean_fee: number;
  target_value: string;
}

export interface GeneralManager {
  id?: number;
  created_date?: string;
  modified_date?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_active?: boolean;
  user?: number;
  secondary_store?: number[];
}

export interface Plan {
  id: number;
  payplan: Payplan[];
  created_date: string;
  modified_date: string;
  name: string;
}

export interface Payplan {
  id: number;
  created_date: string;
  modified_date: string;
  desc: string;
  percent: string;
  deal_start_range: number;
  deal_end_range: number;
  plan: number;
}
