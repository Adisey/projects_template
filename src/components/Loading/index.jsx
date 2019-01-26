import React, { Component } from 'react';

import './styles.scss';

export default class Loading extends Component {
    render () {
        return (
            <section className = { 'loading' }>
                <div className = { 'container--center' }>
                    <div className = { 'dancing-pug' }>
                        <ul>
                            <li className = { 'ear elq' } />
                            <li className = { 'ear' } />
                            <li className = { 'eye' } />
                            <li className = { 'eye' } />
                            <li />
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}
