import React from "react"
import { IconType } from "react-icons/lib"

export declare type Menu = {
  text: string
  onClick?: Function
  link?: string
  icon?: IconType
  id?: string
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

export declare type TimeUnit = "minutes" | "hours" | "days"

export declare type CompanyType = {
  id: number
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
  primary_color: string
  banner: string
}

export interface Service {
  id: number
  name: string
  description: string
  max_duration: number
}

export declare type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>

export declare interface ModalProps {
  isOpen: boolean
  setOpen: SetStateFn<boolean>
}
