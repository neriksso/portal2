import React, { Component } from 'react';
import { getTrafficLight, setTrafficLightUnit } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button, Label, OverlayTrigger, Popover} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';


export default class TrafficLightUnit extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false, showUpdateAlert: false};
    }

    dataChanged = (data) => {
        this.props.dispatch(setTrafficLightUnit(this.props.unit.id, data));
        this._showUpdateAlert();
    };

    onChangeEvent = (event) => {
        this.props.dispatch(setTrafficLightUnit(this.props.unit.id, {
            [event.target.name]: event.target.value
        }));
        this._showUpdateAlert()
    }

    render() {
        const { unit, key, read_only, statuses } = this.props;
        const circleStyle = {
            backgroundColor: unit.status ? unit.status.color : ""
        };
        return (
                <li key={key}>
                    <OverlayTrigger trigger="hover" placement="bottom" overlay={<Popover id={unit.id} title="Notes">{unit.notes}</Popover>}>
                        <div className={read_only ? "read_only circle" : "circle"} style={circleStyle} onClick={read_only ? null :this._editUnit}>{unit.value}</div>
                    </OverlayTrigger>
                    <Modal show={this.state.showModal} onHide={this._close}>
                        <ModalHeader>
                            <ModalTitle>Update Traffic Light Unit&nbsp;
                                <span className={this.state.showUpdateAlert ? "" : "hidden"}>
                                    <Label bsStyle="success">
                                        Updated!
                                    </Label>
                                </span></ModalTitle>
                        </ModalHeader>
                        <ModalBody>

                            <div>
                                <h3>Status</h3>
                                <select className="form-control" name="status" defaultValue={unit.status ? unit.status.id : ""} onChange={this.onChangeEvent}>
                                    <option>Please select a status</option>
                                    {statuses.map(function(status) {
                                        return <option key={status.id} value={status.id}>{status.label}</option>;
                                    })}
                                </select>
                            </div>
                            <div>
                                <h3>Value</h3>
                                <InlineEdit
                                activeClassName="editing"
                                text={unit.value ? unit.value : 'Enter value here'}
                                paramName="value"
                                change={this.dataChanged}
                            />
                            </div>
                            <div>
                                <h3>Notes</h3>
                                <textarea className="form-control" name="notes" placeholder="Enter notes here" defaultValue={unit.notes} onChange={this.onChangeEvent}/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button  onClick={this._close}>Close</Button>
                        </ModalFooter>
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

    _showUpdateAlert()  {
        this.setState({showUpdateAlert: true});
        setTimeout(() => {this.setState({showUpdateAlert: false});}, 2000);
    }
}