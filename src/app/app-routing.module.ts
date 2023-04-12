import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationformComponent } from './reservationform/reservationform.component';

const routes: Routes = [
  { path: '', redirectTo: 'reservation-list', pathMatch: 'full' },
  { path:'reservation-list', component: ReservationListComponent },
  { path:'reservation-add',component:ReservationformComponent},
  { path:'reservation-add/:id',component:ReservationformComponent},
  { path:'**',redirectTo: '/reservation-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
