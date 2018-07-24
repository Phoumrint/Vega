import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import HttpStatus from 'http-status-codes';

import EditMakeModel from './EditMakeModel';
import EditFeatures from './EditFeatures';
import EditContact from './EditContact';

// Component for creating or editing a vehicle
class EditVehicle extends Component {
    constructor(props) {
        super();
        this.state = {
            baseUrl: 'http://localhost:5000',
            goback: false,
            makes: [],
            features: [],

            // Vehicle data
            id: props.match.params.id,
            makeId: "",
            modelId: "",
            registered: false,
            featureIds: [],
            contact: {
                name: "",
                phone: "",
                email: ""
            }
        };
    }

    componentDidMount() {
        // Create multiple requests
        let requests = [
            fetch(this.state.baseUrl + '/api/makes'),
            fetch(this.state.baseUrl + '/api/features')
        ];
        if (this.state.id) {
            requests.push(fetch(`${this.state.baseUrl}/api/vehicles/${this.state.id}`));
        }

        // Fetch multiple requests
        Promise.all(requests)
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(data => {
            let state = {
                makes: data[0],
                features: data[1]
            };
            if (this.state.id) {
                this.updateVehicleState(state, data[2]);
            }
            this.setState(state);
        });
    }

    // Updates vehicle data from the database in the component state
    updateVehicleState(state, vehicle) {
        state.id = vehicle.id;
        state.makeId = vehicle.make.id;
        state.modelId = vehicle.model.id;
        state.registered = vehicle.registered;
        state.contact = vehicle.contact;
        state.featureIds = vehicle.features.map(feature => feature.id);
    }

    // Gets vehicle data from component state for saving to the database.
    getVehicleForSaving = () => {
        let state = this.state;
        let vehicle = {
            id: state.id,
            makeId: state.makeId,
            modelId: state.modelId,
            featureIds: state.featureIds,
            registered: state.registered,
            contact: state.contact
        }

        return vehicle;
    }

    // Function for a child component to update a property value in parent state
    updateState = (name, data) => {
        this.setState({[name]: data});
    }

    // Handler for change in radio buttons to update whether vehicle is registered
    onRegisteredChange = (event) => {
        let registered = event.target.value === "true";
        this.setState({
            registered: registered
        });
    }

    // Submit handler for saving data to the database.
    // For a vehicle with no id, the submit will be to create a new vehicle in the database.
    // For a vehicle with id, the submit is to update an exisiting vehicle in the database.
    onSubmit = () => {
        const vehicle = this.getVehicleForSaving();
        const bodyContent = JSON.stringify(vehicle);
        let url = `${this.state.baseUrl}/api/vehicles`;
        let method = 'post';
        if (this.state.id) {
            url = `${this.state.baseUrl}/api/vehicles/${this.state.id}`;
            method = 'put';
        }
        fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: bodyContent
        })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                this.setState({goback: true});
            }
            else {
                console.log('Save status', response.status);
            }
        })
    }

    // Deletes a vehicle from the database.
    onDelete = () =>  {
        const url = `${this.state.baseUrl}/api/vehicles/${this.state.id}`;
        fetch(url, {
            method: 'delete'
        })
        .then(response => {
            if (response.status === HttpStatus.OK) {
                this.setState({goback: true});
            }
        })
    }

    // For rendering the editing vehicle form.
    render() {
        if (this.state.goback) {
            return(<Redirect to="/vehicles" />);
        }
        return (
            <div>
                <section className="mt-5 w-50">
                    <h3 className="mb-3">Edit Vehicle</h3>
                    <form>
                        <EditMakeModel makes={this.state.makes}
                            makeId={this.state.makeId} modelId={this.state.modelId}
                            updateState={this.updateState} />
                        <EditFeatures features={this.state.features}
                            featureIds={this.state.featureIds}
                            updateState={this.updateState} />
                        <EditContact contact={this.state.contact}
                            updateState={this.updateState} />
                        <div className="form-group">
                            <label className="control-label">Is this vehicle registered?</label>
                            <label><input type="radio" name="registered" value={true} checked={this.state.registered} onChange={this.onRegisteredChange}/>Yes</label>
                            <label><input type="radio" name="registered" value={false} checked={!this.state.registered} onChange={this.onRegisteredChange}/>No</label>
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