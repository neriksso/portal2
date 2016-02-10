import React, { Component } from 'react';

export default class ReadOnlyCollection extends Component {

    render() {
        return (
            <div>
                {this.props.collection.length ? (
                    <ul>
                        {this.props.collection.map(function (object, i) {
                            return <li key={i}> {object}</li>;
                        })}
                    </ul>) : (null)}
            </div>
        );
    }
}