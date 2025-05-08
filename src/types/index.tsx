import React from "react"

export declare type Menu = {
  text: string
  onClick?: Function
  link?: string
}

export enum WeekDays {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export declare type Roles = "OWNER" | "ADMIN" | "EMPLOYEE" | "CLIENT"

export declare type ServiceLocation = "online" | "local"

export declare type CompanyType = {
  name: string
  description: string
  phone: string
  work_days: WeekDays[]
  services: Service[]
  opens_at: string
  closes_at: string
  image_url: string
  timezone: string
  keywords: string[]
  address: string
  identifier: string
}

export interface Service {
  id: number
  name: string
  description: string
  max_duration: number
}

export declare type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>
