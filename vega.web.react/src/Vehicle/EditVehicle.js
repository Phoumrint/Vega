import React, {Component} from 'react';

class EditVehicle extends Component {
    /*
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
    */
   constructor() {
        super();
        this.state = {
            baseUrl: 'http://localhost:5000',
            makeUrl: '',
            featureUrl: '',
            vehicleUrl: '',
            makes: [],
            models: [],
            features: [],
            saveVehicle: {}
        };
        this.state.makeUrl = this.state.baseUrl + '/api/makes';
    }

    componentDidMount() {
        fetch(this.state.makeUrl)
        .then(resp => resp.json())
        .then(makes => {
          this.setState({makes: makes});
        });
    
    }

    onSubmit() {

    }

    onDelete()  {
    }

    render() {
        return (
            <div>
                <section className="mt-5 w-50">
                    <h3 className="mb-3">Edit Vehicle</h3>
                    <form>
                        <div className="form-group">
                            <label className="control-label" htmlFor="make">Make</label>
                            <select className="form-control" name="make" required>
                                <option value=""></option>
                                { this.state.makes.map(
                                    make => 
                                    <option key={make.id} value={make.id}>{make.name}</option>
                                )}

                             </select>
                            </div>

                        <button type="button" className='btn btn-primary' onClick={this.onSubmit}>Save</button>{' '}
                        <button type="button" className='btn btn-danger' onClick={this.onDelete}>Delete</button>
                    </form>
                </section>
                { /*
                <div  class="alert alert-danger" *ngIf="errMessage">{{errMessage}}</div>
                <section class="mt-5 w-50">
                    <h3 class="mb-3">Edit Vehicle</h3>
                    <form class="form-horizontal" novalidate #frm="ngForm" (submit)="submit()">
                        <div class="form-group">
                            <label class="control-label" for="make">Make</label>
                            <select class="form-control" name="make" (change)="onMakeChange()" [(ngModel)]="saveVehicle.makeId" required #make="ngModel">
                                <option value=""></option>
                                <option *ngFor="let m of makes" [value]="m.id">{{m.name}}</option>
                            </select>
                            <div class="alert alert-danger" *ngIf="make.touched && !make.valid">Please specify a make.</div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="model">Model</label>
                            <select class="form-control" name="model" [(ngModel)]="saveVehicle.modelId" required #model="ngModel">
                                <option value=""></option>
                                <option *ngFor="let m of models" [value]="m.id">{{m.name}}</option>
                            </select>
                            <div class="alert alert-danger" *ngIf="model.touched && !model.valid">Please specify a model.</div>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Is this vehicle registered? </label>
                            <label><input type="radio" [value]="true" name="register" [(ngModel)]="saveVehicle.registered"> Yes</label>
                            <label><input type="radio" [value]="false" name="register" [(ngModel)]="saveVehicle.registered"> No</label>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="features">Features</label>
                            <select name="features" class="form-control" multiple size=5 [(ngModel)]="saveVehicle.featureIds">
                                <option *ngFor="let feature of features" [value]="feature.id">{{feature.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="contactName">Contact Name</label>
                            <input type="text" name="contactName" class="form-control" [(ngModel)]="saveVehicle.contact.name" required #contactName="ngModel" />
                            <div class="alert alert-danger" *ngIf="contactName.touched && !contactName.valid">Please specify a contact name.</div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="contactPhone">Contact Phone</label>
                            <input type="tel" name="contactPhone" class="form-control" [(ngModel)]="saveVehicle.contact.phone" required #contactPhone="ngModel" />
                            <div class="alert alert-danger" *ngIf="contactPhone.touched && !contactPhone.valid">Please specify a contact phone.</div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="contactEmail">Contact Email</label>
                            <input type="email" name="contactEmail" class="form-control" [(ngModel)]="saveVehicle.contact.email"/>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary" [disabled]="!frm.valid">Save</button>
                            <button type="button" class="btn btn-danger" *ngIf="saveVehicle.id" (click)="delete()">Delete</button>
                        </div>
                    </form>
                </section>
                */ }
            </div>
        );
    }
}

export default EditVehicle;