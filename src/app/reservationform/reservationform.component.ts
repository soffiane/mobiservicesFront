import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Bus } from '../model/bus';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.scss']
})
export class ReservationformComponent implements OnDestroy, OnInit{

  reservationForm: FormGroup;

  private subscriptions:Subscription[] = [];

  buses?:Observable<Bus[]>;

  constructor(private reservationService: ReservationsService,private busService: BusService, private router: Router, private route: ActivatedRoute){
    this.reservationForm = new FormGroup({
      bus: new FormControl('',[Validators.required]),
      reservationDate: new FormControl('',[Validators.required]),
      client: new FormControl('',[Validators.required])
    })
  }

  ngOnInit():void{
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
    const subscription: Subscription = this.reservationService.getById(id).subscribe(
        {
          next: (result: Reservation) => {this.reservationForm.patchValue(result)},
          error: (error: Error) => { console.error(error) },
          complete: ()=>{ console.log('complete') }
        }
      );
      this.subscriptions.push(subscription);
    }
    this.buses = this.busService.getAllBuses();
  }

  createOrUpdateReservation():void{
    const subscription: Subscription = this.reservationService.create(this.reservationForm.value).subscribe(
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
