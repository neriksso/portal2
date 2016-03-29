import React, { Component } from 'react';
import { getTrafficLight, setTrafficLightUnit } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';


export default class TrafficLightUnit extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    dataChanged = (data) => {
        this.props.dispatch(setTrafficLightUnit(this.props.unit.id, data));
    };

    onChangeEvent = (event) => {
        this.props.dispatch(setTrafficLightUnit(this.props.unit.id, {
            [event.target.name]: event.target.value
        }));
    }

    render() {
        const { unit, key, statuses } = this.props;
        const circleStyle = {
            backgroundColor: unit.status.color
        };
        const divStyle = {
            width: "50px",
            height: "50px"
        }
        return (
                <li key={key}>
                    <div className="circle" style={circleStyle} onClick={this._editUnit}>{unit.value}</div>
                    <Modal show={this.state.showModal} onHide={this._close}>
                        <h1>Edit</h1>
                        <ul>
                            <li>
                                <p>Value: <InlineEdit
                                    activeClassName="editing"
                                    text={unit.value ? unit.value : 'Enter value here'}
                                    paramName="value"
                                    change={this.dataChanged}
                                />
                                </p>
                            </li>
                            <li>
                                <p>
                                    Notes: <textarea className="form-control" name="notes" placeholder="Enter notes here" defaultValue={unit.notes} onChange={this.onChangeEvent}/>
                                </p>
                            </li>
                            <li>
                                <p>
                                    Status:
                                    <select className="form-control" name="status" defaultValue={unit.status.id} onChange={this.onChangeEvent}>
                                        {statuses.map(function(status) {
                                            return <option key={status.id} value={status.id}>{status.label}</option>;
                                        })}
                                    </select>
                                </p>
                            </li>
                        </ul>
                    </Modal>
                </li>
        );
    }

    _editUnit = (event) => {
        this.setState({showModal: true});
    }

    _close = (event) => {
        this.setState({showModal: false});
    }
}