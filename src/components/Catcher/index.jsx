// Core
import React, { Component } from 'react';

// Instruments
import './styles.scss';

export default class Catcher extends Component {
    state = {
        error: false,
    }

    componentDidCatch (error, stack) {
        console.log('ERROR:', error.message);
        console.log('STACKTRACE:', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { 'catcher' }>
                    <span>Unknown error happened.</span>
                    <p>Our engineers team already working in order to fix that for you!</p>
                </section>
            );
        }

        return children;
    }
}
