import React, {Component} from 'react';

// Component for selecting vehicle features
class EditFeatures extends Component {
    constructor(props) {
        super();

        this.state = {
            updateState: props.updateState,
            
            featureIds: props.featureIds,
            features: props.features
        };
    }

    static getDerivedStateFromProps(props, state) {
        // Updates feature Ids and features in the component state if they were
        // changed in the parent component (after retrieving vehicle data).
        // The UI will be updated as the result of the changes.
        if (state.features !== props.features || state.featureIds !== props.featureIds) {
            return {
                features: props.features,
                featureIds: props.featureIds
            }
        }
        return null;
    }

    // Event handler when the user makes vehicle feature selection
    onFeatureChange = (event) => {
        const options = event.target.options;

        this.setState((prevState) => {
            let featureIds = [];
            let len = options.length;
            for (let i = 0; i < len; i++) 
            {
                let option = options[i];
                if (option.selected) {
                    featureIds.push(option.value);
                }
            }
            this.state.updateState('featureIds', featureIds);
            return {
                featureIds: featureIds
            };
        });
    }

    render() {
        return(
            <div className="form-group">
                <label className="control-label" htmlFor="featureIds">Features</label>
                <select name="featureIds" className="form-control" multiple size='5' 
                    value={this.state.featureIds}
                    onChange={this.onFeatureChange}>
                    { this.state.features.map(
                        feature => 
                        <option key={feature.id} value={feature.id}>{feature.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default EditFeatures;