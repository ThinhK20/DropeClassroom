/* eslint-disable no-useless-escape */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as moment from "moment";

export const cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs));
};

export const validateEmail = (email: string) => {
   return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   );
};

export const formatDate = (date: Date | null) => {
   return moment(date).format("DD/MM/YYYY");
};
