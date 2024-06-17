import { Hotel } from "./hotel";

export type ResTokenCheck = { success: boolean };
export type ResHotel = Hotel[];

export type ResReserve = {
  id: number;
  checkin: string;
  checkout: string;
  plan_id: number;
  number: number;
};
