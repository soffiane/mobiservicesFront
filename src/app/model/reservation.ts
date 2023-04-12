import { Bus } from "./bus";

export interface Reservation {
  id?: number;
  reservationDate: Date;
  client: {
    id: number;
    name: string;
    email: string;
  };
  buses: Bus[];
}
