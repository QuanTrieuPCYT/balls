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

export interface IDomainData {
  id: number,
  domain: string,
  verified: boolean,
}

export interface IShortenURL {
  path: string,
  expireAt: number | null,
  password: string | null,
  url: string,
  domain: string,
}

export function generateToken(length: number, lower?: boolean, upper?: boolean, num?: boolean) {
  var charset = "", token = "";
  if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
  if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (num) charset += "0123456789";
  for (var i = 0, n = charset.length; i < length; ++i) {
    token += charset.charAt(Math.floor(Math.random() * n));
  }
  return token;
}