import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from '../model/bus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  apiUrl = 'mobiservices/buses';

  constructor(private http:HttpClient) { }

  getAllBuses():Observable<Bus[]>{
    return this.http.get<Bus[]>(`${this.apiUrl}`);

  }
}
