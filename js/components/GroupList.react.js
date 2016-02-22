import React, { Component } from 'react';

export default class GroupList extends Component {
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
                                    <span>{object[2]}</span>
                                </li>;
                            })}
                        </ul>) : (null)}
                </div>
            </div>
        );
    }
}