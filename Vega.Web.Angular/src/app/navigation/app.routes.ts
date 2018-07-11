import { Routes } from '@angular/router';
import { EditVehicleComponent } from '../vehicle/edit-vehicle.component';
import { HomeComponent } from '../app/home.component';
import { ListVehicleComponent } from '../vehicle/list-vehicle.component';
import { VehicleDetailComponent } from '../vehicle/vehicle-detail.component';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'vehicles/new', component: EditVehicleComponent},
    { path: 'vehicles/:id', component: EditVehicleComponent},
    { path: 'vehicles', component: ListVehicleComponent}
];
