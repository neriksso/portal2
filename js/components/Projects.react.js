import React, { Component } from 'react';
import { getProjects, getStatuses } from '../actions/AppActions';
import TrafficLight from './TrafficLight.react.js';
import LoadingButton from './LoadingButton.react';


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
            <section className="text-section">
                <h2>Projects</h2>
                <ul>
                    {projects.map(function(project) {
                        return <li key={project.id}>{project.id}: {project.name}<TrafficLight url={project.traffic_light} dispatch={dispatch} trafficlights={trafficlights} statuses={statuses} statuses_errors={statuses_errors} /></li>;
                    })}
                </ul>

            </section>
        );
    }
}