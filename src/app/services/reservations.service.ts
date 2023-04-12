import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  apiUrl = 'mobiservices/reservations';

  constructor(private http:HttpClient) { }

  getAllReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  findReservationById(id:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/${id}`);
  }

  create(reservation: Reservation): Observable<Reservation> {
    console.log("reservation id"+ reservation.id);
    if(reservation.id){
      return this.http.put<Reservation>(`${this.apiUrl}/${reservation.id}`, reservation);
    } else {
      return this.http.post<Reservation>(`${this.apiUrl}`, reservation);
    }

  }

  getById(id: string): Observable<Reservation> {
    console.log(id);
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<Reservation> {
    return this.http.delete<Reservation>(`${this.apiUrl}/${id}`);
    }
}
