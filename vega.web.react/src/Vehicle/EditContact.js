import React, {Component} from 'react';

class EditContact extends Component {
    constructor(props) {
        super();

        this.state = {
            baseUrl: 'http://localhost:5000',
            updateState: props.updateState,
            
            contact: props.contact
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.contact !== props.contact) {
            return {
                contact: props.contact
            };    
        }
        return null;
    }

    onContactChange = (event) => {
        const name = event.target.name;
        const val = event.target.value;

        this.setState((prevState) => {
            prevState.contact[name] = val;
            this.state.updateState('contact', prevState.contact);
            return {
                contact: prevState.contact
            };
        });
    }

    render() {
        return(
            <div>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Contact Name</label>
                    <input type="text" name="name" className="form-control" required 
                        value={this.state.contact.name}
                        onChange={this.onContactChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="phone">Contact Phone</label>
                    <input type="tel" name="phone" className="form-control" required
                        value={this.state.contact.phone}
                        onChange={this.onContactChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="email">Contact Email</label>
                    <input type="email" name="email" className="form-control" 
                        value={this.state.contact.email}
                        onChange={this.onContactChange} />
                </div>
            </div>
        );
    }
}

export default EditContact;