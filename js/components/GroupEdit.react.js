import React, { Component } from 'react';
import ReadOnlyCollection from './ReadOnlyCollection.react';
import { getUserProfile, getUserGroups, getAvailableUserGroups, setUserGroups } from '../actions/AppActions';

export default class GroupEdit extends Component {
    dataChanged = (e) => {
        this.props.dispatch(this.props.changeEvent(this.props.username, [e]));

        //var changeSet = this.state.checked;
        //changeSet[e][3] = !changeSet[e][3];
        //this.setState({ checked: changeSet });
        //console.log(this.state);
    };

    render() {
        return (
            <div>
                <p>
                    {this.props.caption}: {this.props.groups.length ? null : 'None'}
                </p>
                <div>
                    {this.props.groups.length ? (
                        <ul>
                            {this.props.groups.map((object, i) => {
                                return <li key={object[1]}>
                                    <input type="checkbox"
                                           defaultChecked={object[3]}
                                           onChange={this.dataChanged.bind(this, object[2])}
                                    />
                                    <span>{object[2]}</span>
                                </li>;
                            })}
                        </ul>) : (null)}
                </div>
            </div>
        );
    }
}