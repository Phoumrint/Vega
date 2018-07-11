import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Make } from '../models/make';
import { HttpClient } from '@angular/common/http';
import { Feature } from '../models/feature';
import { SaveVehicle } from '../models/saveVehicle';
import { Vehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {
    baseUrl = 'http://localhost:5000';
    makeUrl = this.baseUrl + '/api/makes';
    featureUrl = this.baseUrl + '/api/features';
    vehicleUrl = this.baseUrl + '/api/vehicles';

    constructor(private http: HttpClient) {
    }

    getMakes(): Observable<Make[]> {
        return this.http.get<Make[]>(this.makeUrl);
    }

    getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.featureUrl);
    }

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.vehicleUrl);
    }

    getVehicle(id: number): Observable<Vehicle> {
        const url = `${this.vehicleUrl}/${id}`;
        return this.http.get<Vehicle>(url);
    }

    postVehicle(saveVehicle: SaveVehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(this.vehicleUrl, saveVehicle);
    }

    putVehicle(saveVehicle: SaveVehicle): Observable<Vehicle> {
        const url = `${this.vehicleUrl}/${saveVehicle.id}`;
        return this.http.put<Vehicle>(url, saveVehicle);
    }

    deleteVehicle(vehicleId: number): Observable<Vehicle> {
        const url = `${this.vehicleUrl}/${vehicleId}`;
        return this.http.delete<Vehicle>(url);
    }
}
