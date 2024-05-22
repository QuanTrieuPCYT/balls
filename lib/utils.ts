import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface IPanelBreadcrumb {
  name: string
  path: string | null
}

export interface IURLData {
  url: string,
  domain: string,
  path: string,
  createdAt: EpochTimeStamp,
  view: number,
}