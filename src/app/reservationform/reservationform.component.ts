import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Bus } from '../model/bus';
import { BusService } from '../services/bus.service';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.scss']
})
export class ReservationformComponent implements OnDestroy, OnInit{

  reservationForm: FormGroup;

  private subscriptions:Subscription[] = [];

  allBuses?:Observable<Bus[]>;
  clients?:Observable<Client[]>;

  constructor(private reservationService: ReservationsService,private busService: BusService,private clientService: ClientService, private router: Router, private route: ActivatedRoute){
    this.reservationForm = new FormGroup({
      buses: new FormControl('',[Validators.required]),
      reservationDate: new FormControl('',[Validators.required]),
      client: new FormControl('',[Validators.required])
    })
  }

  ngOnInit():void{
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
    const subscription: Subscription = this.reservationService.getById(id).subscribe(
        {
          next: (result: Reservation) => {
            console.log("result "+result.id),
            this.reservationForm.patchValue(result)
          },
          error: (error: Error) => { console.error(error) },
          complete: ()=>{ console.log('complete') }
        }
      );
      this.subscriptions.push(subscription);
    }
    this.allBuses = this.busService.getAllBuses();
    this.clients = this.clientService.getAllClients();
  }

  createOrUpdateReservation():void{
    console.log("id "+this.reservationForm.value.id);
    console.log("bus "+this.reservationForm.value.buses);
    console.log("client "+this.reservationForm.value.client);
    console.log("date "+this.reservationForm.value.reservationDate);

    const reservation: Reservation = {
      id: this.reservationForm.value.id,
      reservationDate: this.reservationForm.value.reservationDate,
      client: this.reservationForm.value.client,
      buses: Array.of(this.reservationForm.value.buses)
    };

    const subscription: Subscription = this.reservationService.create(reservation).subscribe(
      {
        next: (result: Reservation) => {this.router.navigateByUrl('/reservation-list');},
        error: (error: Error) => { console.error(error) },
        complete: ()=>{ console.log('complete') }
      }
    );
    this.subscriptions.push(subscription);
  }

  delete():void{
    const subscription: Subscription = this.reservationService.delete(this.reservationForm.value).subscribe(
      {
        next: () => {this.router.navigateByUrl('/reservation-list');},
        error: (error: Error) => { console.error(error) },
        complete: ()=>{ console.log('complete') }
      }
    );
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
