import React, { Component } from 'react';
import { getProjects } from '../actions/AppActions';
import TrafficLight from './TrafficLight.react.js';
import LoadingButton from './LoadingButton.react';


export default class Projects extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getProjects();
    }

    _getProjects() {
        this.props.dispatch(getProjects());
    }

    render() {
        const { dispatch, projects, trafficlights } = this.props;
        return (
            <section className="text-section">
                <h2>Projects</h2>
                <ul>
                    {projects.map(function(project) {
                        return <li key={project.id}>{project.id}: {project.name}<TrafficLight url={project.traffic_light} dispatch={dispatch} trafficlights={trafficlights}/></li>;
                    })}
                </ul>

            </section>
        );
    }
}