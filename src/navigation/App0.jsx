import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import { Page1 } from '../pages';
// Styles
import './App.scss';

export default
@hot(module)
class App extends Component {
    render () {
        return (
            <div>
                <Page1 />
            </div>
        );
    }
}
