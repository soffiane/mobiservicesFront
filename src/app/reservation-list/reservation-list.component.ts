import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Reservation } from '../model/reservation';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit, OnDestroy{

  //? = peut etre indefined
  reservations?:Observable<Reservation[]>;
  search?:string;
  subscriptions:Subscription[] = [];

  constructor(private reservationService:ReservationsService){}

  ngOnInit(){
    console.log("toto");
    this.reservations = this.reservationService.getAllReservations();
  }

  find(event?: any):void {
    this.search=event;
    console.log(event);
    this.reservations = this.reservationService.findReservationById(event);
  }

  delete(id: number):void {
    console.log(id);
    const subscription:Subscription = this.reservationService.delete(id).subscribe(
      {
        //on reapelle le service de chargement de la liste des consumers apres la suppression
        next: () => {this.find(this.search);},
        error: (error: Error) => { console.error(error) },
        complete: ()=>{ console.log('complete') }
      }
    );
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

}
