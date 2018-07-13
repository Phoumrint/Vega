import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ListVehicles extends Component {

    constructor() {
        super();
        this.state = {
            url: "http://localhost:5000/api/vehicles",
            vehicles: []
        }
      }
    
      componentDidMount() {
        fetch(this.state.url)
        .then(resp => resp.json())
        .then(vehicles => {
          this.setState({vehicles: vehicles});
        });
    
      }
    
    render() {
        return (
            <div className="container">
                <h1>Vehicles</h1>
                <table class="table table-sm table-striped">
                    <tr>
                        <th>Id</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Contact Name</th>
                        <th></th>
                    </tr>
                    { this.state.vehicles.map(
                        vehicle => 
                        <tr>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.make.name}</td>
                            <td>{vehicle.model.name}</td>
                            <td>{vehicle.contact.name}</td>
                            <td>
                                <Link to={`/vehicles/${vehicle.id}`}>Edit</Link>
                            </td>
                        </tr>
                    )}
                 </table>
            </div>
        );
    }
}

export default ListVehicles;