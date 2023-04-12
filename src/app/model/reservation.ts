export interface Reservation {
  id: number;
  reservationDate: Date;
  client: {
    id: number;
    name: string;
    email: string;
  };
  bus: {
    id: number;
    route: string;
    seats: number;
    departureTime: string;
    price: number;
  };
}
