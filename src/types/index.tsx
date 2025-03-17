export declare type Menu = {
  text: string;
  onClick?: Function;
  link?: string;
};

export enum WeekDays {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export declare type Category = "eletric" | "mechanic" | "health" | "home" | "services";

export declare type ServiceLocation = "online" | "local";

export declare type CompanyType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  phone: string;
  category: Category;
  work_days: WeekDays[];
  services: Service[];
  opens_at: string;
  closes_at: string;
};

export interface Service {
  id: number;
  name: string;
  description: string;
  max_duration: number;
}
