import React, { Component } from 'react';
import { getTrafficLight } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';


export default class TrafficLightUnit extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { unit } = this.props;
        const style = {
            backgroundColor: unit.status.color
        };
        return (
                <li key={unit.id} style={style}><b>{unit.status.label}</b></li>
        );
    }
}