import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutes } from '../navigation/app.routes';
import { NavigationComponent } from '../navigation/navigation.component';
import { EditVehicleComponent } from '../vehicle/edit-vehicle.component';
import { HomeComponent } from './home.component';
import { VehicleService } from '../services/vehicle.service';
import { ListVehicleComponent } from '../vehicle/list-vehicle.component';
import { VehicleDetailComponent } from '../vehicle/vehicle-detail.component';
import { AppErrorHandler } from './app.error-handler';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    EditVehicleComponent,
    VehicleDetailComponent,
    ListVehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
