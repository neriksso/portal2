import React, { Component } from 'react';
import { getProjects, getStatuses, getBurndown } from '../actions/AppActions';
import TrafficLight from './TrafficLight.react.js';
import LoadingButton from './LoadingButton.react';
import { Button } from 'react-bootstrap';

export default class Projects extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        this._getProjects();
        this._getStatuses();
        this._getBurndown();
    }

    _getProjects() {
        this.props.dispatch(getProjects());
    }

    _getStatuses() {
        this.props.dispatch(getStatuses());
    }

    _getBurndown() {
        this.props.dispatch(getBurndown());
    }

    render() {
        const { dispatch, projects, statuses, statuses_errors, trafficlights, burndown } = this.props;
        return (
            <section className="text-section projects-widget">
                <div className="header-row"><h4 className="pull-left">Projects</h4></div>
                <table className="table projects-table">
                    <col width="25%" />
                    <col width="*" />
                    <col width="10%" />
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(function(project) {
                            return <tr key={project.id}>
                                <td>{project.name}</td>
                                <td><TrafficLight url={project.traffic_light} dispatch={dispatch} trafficlights={trafficlights} statuses={statuses} statuses_errors={statuses_errors} /></td>
                                <td><Button block> View </Button></td>
                            </tr>;
                        })}
                    </tbody>
                </table>
                <div className="header-row"><h4 className="pull-left">Sprint Info: {burndown.name}</h4></div>
                <div>
                    <table className="table">
                        <col width="20%"/>
                        <col width="75%"/>
                        <tbody>
                            <tr>
                                <td>Burndown Hours:</td>
                                <td>{burndown.burndown_hours}</td>
                            </tr>
                            <tr>
                                <td>Start Date:</td>
                                <td>{burndown.start_date}</td>
                            </tr>
                            <tr>
                                <td>End Date:</td>
                                <td>{burndown.end_date}</td>
                            </tr>
                            <tr>
                                <td>Total Days:</td>
                                <td>{burndown.total_days}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}