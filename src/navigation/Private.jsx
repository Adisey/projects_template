// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Page1, Page2 } from '../pages';

// Instruments
import { book } from './book';

export default class Private extends Component {
    render () {
        return (
            <Switch>
                <Route component = { Page1 } path = { book.page1 } />
                <Route component = { Page2 } path = { book.page2 } />
                {/* <Route component = { Profile } path = { book.profile } />
                <Route component = { NewPassword } path = { book.newPassword } /> */}
                <Redirect to = { book.page1 } />
                {/* <Feed /> */}
            </Switch>
        );
    }
}
