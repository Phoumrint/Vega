import { Component, OnInit } from '@angular/core';
import { Make } from '../models/make';
import { Feature } from '../models/feature';
import { SaveVehicle } from '../models/saveVehicle';
import { Model } from '../models/model';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-vehicle',
    templateUrl: './edit-vehicle.component.html'
})
export class EditVehicleComponent implements OnInit {
    makes: Make[];
    models: Model[];
    features: Feature[];
    saveVehicle: SaveVehicle;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService) {
        this.saveVehicle = new SaveVehicle();
        this.saveVehicle.featureIds = [];
        this.route.params.subscribe(p => this.saveVehicle.id = +p['id']);
    }

    ngOnInit(): void {
        const requests: Observable<any>[] = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures()
        ];

        // If vehicle id is specified, it is for editing; otherwise it is for new vehicle
        if (this.saveVehicle.id) {
            requests.push(this.vehicleService.getVehicle(this.saveVehicle.id));
        }
        forkJoin(requests).subscribe(data => {
            this.makes = data[0];
            this.features = data[1];
            if (this.saveVehicle.id) {
                this.populateVehicle(data[2]);
                this.populateModels();
            }
        }, err => {
            if (err.status === 404) {
                this.router.navigate(['']);
            }
        });
     }

    onMakeChange() {
        this.populateModels();
    }

    submit() {
        let result: Observable<Vehicle>;
        if (this.saveVehicle.id) {
            // Update
            result = this.vehicleService.putVehicle(this.saveVehicle);
        } else {
            // Create
            result = this.vehicleService.postVehicle(this.saveVehicle);
        }
        result.subscribe((vehicle: Vehicle) => {
            this.router.navigate(['vehicles']);
        });
   }

    delete()  {
        if (confirm('Delete this vehicle?')) {
            this.vehicleService.deleteVehicle(this.saveVehicle.id)
                .subscribe(r => {
                    this.router.navigate(['vehicles']);
                });
        }
    }

    private populateVehicle(vehicle: Vehicle) {
        this.saveVehicle.id = vehicle.id;
        this.saveVehicle.makeId = vehicle.make.id;
        this.saveVehicle.modelId = vehicle.model.id;
        this.saveVehicle.registered = vehicle.registered;
        this.saveVehicle.contact = vehicle.contact;
        vehicle.features.forEach(f => this.saveVehicle.featureIds.push(f.id));
    }

    private populateModels() {
        // tslint:disable-next-line:triple-equals
        const selectedMake = this.makes.find(make => this.saveVehicle.makeId == make.id);
        if (selectedMake) {
            this.models = selectedMake.models;
        } else {
            this.models = [];
        }
    }
}
