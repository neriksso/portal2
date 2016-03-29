import React, { Component } from 'react';
import { getTrafficLight } from '../actions/AppActions';
import TrafficLightUnit from './TrafficLightUnit.react';
import LoadingButton from './LoadingButton.react';
import { get } from 'lodash';


export default class TrafficLight extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getTrafficLight(this.props.url);
    }

    _getTrafficLight(url) {
        if (url) this.props.dispatch(getTrafficLight(url));
    }

    render() {
        const { dispatch, statuses, statuses_errors, trafficlights, url  } = this.props;
        var trafficlight = get(trafficlights, url, {units: []});
        return (
                <ul>
                    {trafficlight.units.map(function(unit) {
                        return <TrafficLightUnit unit={unit} key={unit.id} dispatch={dispatch} statuses={statuses}  statuses_errors={statuses_errors} />;
                    })}
                </ul>
        );
    }
}