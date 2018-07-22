import React, {Component} from 'react';

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
        if (prevProps.makeId !== this.state.makeId) {
            let models = this.getModels(this.state.makes, this.state.makeId);
            this.setState({
                models: models
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
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

    onMakeChange = (event) => {
        const makeId = event.target.value;
        this.state.updateState('makeId', makeId);

        const models = this.getModels(this.state.makes, makeId);
        this.setState({
            models: models
        });
     }

    getModels  = (makes, makeId) => {
        // eslint-disable-next-line 
       const selectedMake = makes.find(make => makeId == make.id);
       if (selectedMake) {
           return selectedMake.models;
       } else {
           return [];
       }
    }

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