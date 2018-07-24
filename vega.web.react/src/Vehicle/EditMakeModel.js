import React, {Component} from 'react';

// Component for editing make and model of a vehicle
class EditMakeModel extends Component {
    constructor(props) {
        super();

        this.state = {
            updateState: props.updateState,

            makeId: props.makeId,
            modelId: props.modelId,
            makes: props.makes,
            models: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Updates a list of vehicle models when make is selected
        if (prevProps.makeId !== this.state.makeId) {
            let models = this.getModels(this.state.makes, this.state.makeId);
            this.setState({
                models: models
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Updates makeId, modelId, and a list of makes in the component state if they were
        // changed in parent component.
        // The UI will be updated as the result of the changes.
        if (state.makes !== props.makes ||
            state.makeId !== props.makeId || state.modelId !== props.modelId) {
            return {
                makes: props.makes,
                makeId: props.makeId,
                modelId: props.modelId
            };    
        }
        return null;
    }

    // Event handler when make is selected.
    // Updates a list of models for the selected make.
    onMakeChange = (event) => {
        const makeId = event.target.value;
        this.state.updateState('makeId', makeId);

        const models = this.getModels(this.state.makes, makeId);
        this.setState({
            models: models
        });
     }

    // Gets a list of models for the selected make.
    getModels  = (makes, makeId) => {
        // eslint-disable-next-line 
       const selectedMake = makes.find(make => makeId == make.id);
       if (selectedMake) {
           return selectedMake.models;
       } else {
           return [];
       }
    }

    // Event handler when a model is selected.
    onModelChange = (event) => {
        const modelId = event.target.value;
        this.state.updateState('modelId', modelId);

        this.setState({
            modelId: modelId
        });
    }

    render() {
        return(
            <div>
                <div className="form-group">
                    <label className="control-label" htmlFor="makeId">Make</label>
                    <select className="form-control" name="makeId" required
                        value={this.state.makeId}
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
                        value={this.state.modelId}
                        onChange={this.onModelChange}>
                        <option value=""></option>
                        { this.state.models.map(
                            model => 
                            <option key={model.id} value={model.id}>{model.name}</option>
                        )}
                    </select>
                </div>
            </div>
        );
    }
}

export default EditMakeModel;