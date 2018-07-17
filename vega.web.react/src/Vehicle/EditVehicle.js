import React, {Component} from 'react';

class EditVehicle extends Component {
    constructor(props) {
        super();
        this.state = {
            baseUrl: 'http://localhost:5000',
            makeUrl: '',
            featureUrl: '',
            vehiclesUrl: '',
            makes: [],
            models: [],
            features: [],
            saveVehicle: {}
        };
        this.state.makeUrl = this.state.baseUrl + '/api/makes';
        this.state.modelUrl = this.state.baseUrl + '/api/models';
        this.state.featureUrl = this.state.baseUrl + '/api/features';
        this.state.vehiclesUrl = this.state.vehicleUrl + '/api/vehicles';
    }

    componentDidMount() {
        // Load makes
        fetch(this.state.makeUrl)
        .then(resp => resp.json())
        .then(makes => {
          this.setState({makes: makes});
        });
 
        // Load features
        fetch(this.state.featureUrl)
        .then(resp => resp.json())
        .then(features => {
          this.setState({features: features});
        });

        if (this.state.id) {
            const vehicleUrl =  `${this.state.vehiclesUrl}/${this.state.id}`;

            fetch(vehicleUrl)
            .then(resp => resp.json())
            .then(vehicle => {
                const saveVehicle = this.getSaveVehicle(vehicle);
                this.setState({saveVehicle: saveVehicle});
            });
    
        }
    }

    getSaveVehicle(vehicle) {
        console.log('Loaded Vehicle', vehicle);
    }

    onSubmit = () => {
        console.log('SaveVehicle', this.state.saveVehicle);
    }

    onDelete()  {
    }

    onChange = (event) => {
        const name = event.target.name;
        const val = event.target.value;
        console.log('Name', name);
        console.log('Value', val);
        console.log('this', this);
    }

    onMakeChange = (event) => {
        const makeId = event.target.value;
        const selectedMake = this.state.makes.find(make => makeId == make.id);
        if (selectedMake) {
            this.setState({models: selectedMake.models});
        } else {
            this.setState({models: []});
        }
    }

    render() {
        return (
            <div>
                <section className="mt-5 w-50">
                    <h3 className="mb-3">Edit Vehicle</h3>
                    <form>
                        <div className="form-group">
                            <label className="control-label" htmlFor="make">Make</label>
                            <select className="form-control" name="make" required onChange={this.onMakeChange}>
                                <option value=""></option>
                                { this.state.makes.map(
                                    make => 
                                    <option key={make.id} value={make.id}>{make.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="model">Model</label>
                            <select className="form-control" name="model" required>
                                <option value=""></option>
                                { this.state.models.map(
                                    model => 
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Is this vehicle registered?</label>
                            <label><input type="radio" name="register" />Yes</label>
                            <label><input type="radio" name="register" />No</label>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="features">Features</label>
                            <select name="features" className="form-control" multiple size='5'>
                                { this.state.features.map(
                                    feature => 
                                    <option key={feature.id} value={feature.id}>{feature.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="contactName">Contact Name</label>
                            <input type="text" name="contactName" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="contactPhone">Contact Phone</label>
                            <input type="tel" name="contactPhone" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="contactEmail">Contact Email</label>
                            <input type="email" name="contactEmail" className="form-control" onChange={this.onChange} />
                        </div>
                        <div>
                            <button type="button" className='btn btn-primary' onClick={this.onSubmit}>Save</button>
                            <span> </span>
                            <button type="button" className='btn btn-danger' onClick={this.onDelete}>Delete</button>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

export default EditVehicle;