import React, { Component } from 'react';
import { getTrafficLight, createTrafficLightUnit } from '../actions/AppActions';
import TrafficLightUnit from './TrafficLightUnit.react';
import LoadingButton from './LoadingButton.react';
import { get } from 'lodash';
import { Glyphicon, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
const assign = Object.assign || require('object.assign');


export default class TrafficLight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this._resetAddObject();
    }

    componentDidMount() {
        this._getTrafficLight(this.props.url);
    }

    dataChanged = (data) => {
        this.state.addObject.value = data.value;
    };

    onChangeEvent = (event) => {
        this.state.addObject[event.target.name] = event.target.value;
    }

    _getTrafficLight(url) {
        if (url) this.props.dispatch(getTrafficLight(url));
    }

    _modalShow = (event) => {
        this.setState({showModal: true});
    }

    _modalClose = (event) => {
        this.setState({showModal: false});
        this._resetAddObject();
    }

    _modalSubmit = (event) => {
        console.log(this.state.addObject);
        this.props.dispatch(createTrafficLightUnit(this.state.addObject));
        this.setState({showModal: false});
        this._resetAddObject();
    }

    _resetAddObject() {
        const addObject = assign({}, this.state.addObject, {status: null, value: '', notes: '', traffic_light: this.props.url});
        this.state = assign({}, this.state, {addObject: addObject});
    }

    render() {
        const { dispatch, statuses, statuses_errors, trafficlights, url  } = this.props;
        var trafficlight = get(trafficlights, url, {units: []});
        return (
                <ul className="trafficlights">
                    {trafficlight.units.map(function(unit) {
                        return <TrafficLightUnit unit={unit} key={unit.id} dispatch={dispatch} statuses={statuses}  statuses_errors={statuses_errors} read_only={trafficlight.current && trafficlight.current.id != unit.id } />;
                    })}
                    <li key="add">
                        <div className="circle add" onClick={this._modalShow}><Glyphicon glyph="plus"/></div>
                        <Modal show={this.state.showModal} onHide={this._modalClose}>
                            <ModalHeader>
                                <ModalTitle>Create Traffic Light Unit</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <h3>Status</h3>
                                    <select className="form-control" name="status" defaultValue={this.state.addObject.status} onChange={this.onChangeEvent}>
                                        <option>-- Select Status --</option>
                                        {statuses.map(function(status) {
                                            return <option key={status.id} value={status.id}>{status.label}</option>;
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <h3>Value</h3>
                                    <InlineEdit
                                        activeClassName="editing"
                                        text={this.state.addObject.value ? this.state.addObject.value : 'Enter value here'}
                                        paramName="value"
                                        change={this.dataChanged}
                                    />
                                </div>
                                <div>
                                    <h3>Notes</h3>
                                    <textarea className="form-control" name="notes" placeholder="Enter notes here" defaultValue={this.state.addObject.notes} onChange={this.onChangeEvent}/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button  onClick={this._modalClose}>Cancel</Button>
                                <Button  onClick={this._modalSubmit}>Create</Button>
                            </ModalFooter>
                        </Modal>
                    </li>
                    <div className="clearfix" />
                </ul>
        );
    }
}