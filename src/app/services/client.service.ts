import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = 'mobiservices/clients';

  constructor(private http:HttpClient) { }

  getAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiUrl}`);

  }
}
