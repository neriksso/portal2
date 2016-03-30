import React, { Component } from 'react';
import { getProjects, getStatuses } from '../actions/AppActions';
import TrafficLight from './TrafficLight.react.js';
import LoadingButton from './LoadingButton.react';
import { Button } from 'react-bootstrap';

export default class Projects extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getProjects();
        this._getStatuses();
    }

    _getProjects() {
        this.props.dispatch(getProjects());
    }

    _getStatuses() {
        this.props.dispatch(getStatuses());
    }

    render() {
        const { dispatch, projects, statuses, statuses_errors, trafficlights } = this.props;
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

            </section>
        );
    }
}