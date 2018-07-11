import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
    selector: 'app-list-vehicle',
    templateUrl: './list-vehicle.component.html'
})
export class ListVehicleComponent implements OnInit {
    vehicles: Vehicle[];

    constructor(private vehicleService: VehicleService) {
    }

    ngOnInit(): void {
        this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => this.vehicles = vehicles);
    }
}
