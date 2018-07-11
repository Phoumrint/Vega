import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent implements OnInit {
     vehicle: Vehicle;

    constructor(private route: ActivatedRoute,
        private vehicleService: VehicleService) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params['id'];
        this.vehicleService.getVehicle(id).subscribe((vehicle: Vehicle) => this.vehicle = vehicle);
    }
 }
