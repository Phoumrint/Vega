import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import HttpStatus from 'http-status-codes';

class EditVehicle extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.match.params.id,
            baseUrl: 'http://localhost:5000',
            goback: false,
            makes: [],
            models: [],
            features: [],
            saveVehicle: {
                featureIds: [],
                contact: {}
            }
        };
    }

    componentDidMount() {
        // Load makes
        const makeUrl  = this.state.baseUrl + '/api/makes';
        fetch(makeUrl)
        .then(resp => resp.json())
        .then(makes => {
          this.setState({makes: makes});
        });
 
        // Load features
        const featureUrl = this.state.baseUrl + '/api/features';
        fetch(featureUrl)
        .then(resp => resp.json())
        .then(features => {
          this.setState({features: features});
        });

        // Load and display vehicle if Id is specified
        if (this.state.id) {
            const vehicleUrl =  `${this.state.baseUrl}/api/vehicles/${this.state.id}`;
            fetch(vehicleUrl)
            .then(resp => resp.json())
            .then(vehicle => {
                const saveVehicle = this.getSaveVehicle(vehicle);
                this.setState({saveVehicle: saveVehicle});
            });
        }
    }

    getSaveVehicle(vehicle) {
        let saveVehicle = {
            id: vehicle.id,
            makeId: vehicle.make.id,
            modelId: vehicle.model.id,
            registered: vehicle.registered,
            contact: vehicle.contact
        };
        saveVehicle.featureIds = vehicle.features.map(feature => feature.id);

        return saveVehicle;
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

    onSubmit = () => {
        const url = `${this.state.baseUrl}/api/vehicles`;
        const bodyContent = JSON.stringify(this.state.saveVehicle);
        console.log('save body', bodyContent);
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: bodyContent
        })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                console.log('Save was successful');
                this.setState({goback: true});
            }
            else {
                console.log('Save status', response.status);
            }
        })
    }

    onDelete = () =>  {
        const url = `${this.state.baseUrl}/api/vehicles/${this.state.saveVehicle.id}`;
        fetch(url, {
            method: 'delete'
        })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                this.setState({goback: true});
            }
        })
    }


    render() {
        if (this.state.goback) {
            return(<Redirect to="/vehicles" />);
        }
        return (
            <div>
                <section className="mt-5 w-50">
                    <h3 className="mb-3">Edit Vehicle</h3>
                    <form>
                        <div className="form-group">
                            <label className="control-label" htmlFor="makeId">Make</label>
                            <select className="form-control" name="makeId" required
                                value={this.state.saveVehicle.makeId}
                                onChange={this.onMakeChange}>
                                <option value=""></option>
                                { this.state.makes.map(
                                    make => 
                                    <option key={make.id} value={make.id}>{make.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="modelId">Model</label>
                            <select className="form-control" name="modelId" required 
                                value={this.state.saveVehicle.modelId}
                                onChange={this.onChange}>
                                <option value=""></option>
                                { this.state.models.map(
                                    model => 
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Is this vehicle registered?</label>
                            <label><input type="radio" name="registered" value={true} onChange={this.onChange}/>Yes</label>
                            <label><input type="radio" name="registered" value={false} onChange={this.onChange}/>No</label>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="featureIds">Features</label>
                            <select name="featureIds" className="form-control" multiple size='5' 
                                value={this.state.saveVehicle.featureIds}
                                onChange={this.onFeatureChange}>
                                { this.state.features.map(
                                    feature => 
                                    <option key={feature.id} value={feature.id}>{feature.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="name">Contact Name</label>
                            <input type="text" name="name" className="form-control" required 
                                value={this.state.saveVehicle.contact.name}
                                onChange={this.onContactChange}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="phone">Contact Phone</label>
                            <input type="tel" name="phone" className="form-control" required
                                value={this.state.saveVehicle.contact.phone}
                                onChange={this.onContactChange}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Contact Email</label>
                            <input type="email" name="email" className="form-control" 
                                value={this.state.saveVehicle.contact.email}
                                onChange={this.onContactChange} />
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