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
            saveVehicle: {
                featureIds: [],
                contact: {}
            }
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

        // Load and display vehicle if Id is specified
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

        this.setState((prevState, props) => {
            // Clone a copy of vehicle
            let saveVehicle = this.copyVehicle(prevState.saveVehicle);
            saveVehicle[name] = val;
            return {
                saveVehicle: saveVehicle
            };
        });
    }

    onMakeChange = (event) => {
        this.onChange(event);
        const makeId = event.target.value;
         // eslint-disable-next-line 
        const selectedMake = this.state.makes.find(make => makeId == make.id);
        if (selectedMake) {
            this.setState({models: selectedMake.models});
        } else {
            this.setState({models: []});
        }
    }

    onFeatureChange = (event) => {
        const options = event.target.options;

        this.setState((prevState) => {
            let saveVehicle = this.copyVehicle(prevState.saveVehicle);
            saveVehicle.featureIds = [];
            let len = options.length;
            for (let i = 0; i < len; i++) 
            {
                let option = options[i];
                if (option.selected) {
                    saveVehicle.featureIds.push(option.value);
                }
            }
            return {
                saveVehicle: saveVehicle
            };
        });
    }

    onContactChange = (event) => {
        const name = event.target.name;
        const val = event.target.value;

        this.setState((prevState) => {
            let saveVehicle =  this.copyVehicle(prevState.saveVehicle);
            saveVehicle.contact[name] = val;
            return {
                saveVehicle: saveVehicle
            };
        });
    }

    copyVehicle(vehicle) {
        return JSON.parse(JSON.stringify(vehicle));
    }

    render() {
        return (
            <div>
                <section className="mt-5 w-50">
                    <h3 className="mb-3">Edit Vehicle</h3>
                    <form>
                        <div className="form-group">
                            <label className="control-label" htmlFor="makeId">Make</label>
                            <select className="form-control" name="makeId" required onChange={this.onMakeChange}>
                                <option value=""></option>
                                { this.state.makes.map(
                                    make => 
                                    <option key={make.id} value={make.id}>{make.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="modelId">Model</label>
                            <select className="form-control" name="modelId" required onChange={this.onChange}>
                                <option value=""></option>
                                { this.state.models.map(
                                    model => 
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Is this vehicle registered?</label>
                            <label><input type="radio" name="registered" value='true' onChange={this.onChange}/>Yes</label>
                            <label><input type="radio" name="registered" value='false' onChange={this.onChange}/>No</label>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="featureIds">Features</label>
                            <select name="featureIds" className="form-control" multiple size='5' onChange={this.onFeatureChange}>
                                { this.state.features.map(
                                    feature => 
                                    <option key={feature.id} value={feature.id}>{feature.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="name">Contact Name</label>
                            <input type="text" name="name" className="form-control" required onChange={this.onContactChange}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="phone">Contact Phone</label>
                            <input type="tel" name="phone" className="form-control" required onChange={this.onContactChange}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Contact Email</label>
                            <input type="email" name="email" className="form-control" onChange={this.onContactChange} />
                        </div>
                        <div>
                            <button type="button" className='btn btn-primary' onClick={this.onSubmit}>Save</button>
                            <span> </span>
                            { 
                                this.state.id ?
                                <button type="button" className='btn btn-danger' onClick={this.onDelete}>Delete</button>
                                : null
                            }
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

export default EditVehicle;