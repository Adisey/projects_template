import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Styles
import './styles.scss';
// Instruments
import { book } from '../navigation/book';
// Actions
import { authAction } from '../bus/auth/actions';

const mapStateToProps = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};

const mapDispathToProps = {
    logoutAsync: authAction.logoutAsync,
};

export default
@withRouter
@connect(
    mapStateToProps,
    mapDispathToProps
)
class Page1 extends Component {
    _logout = () => {
        this.props.logoutAsync();
    }
    page2 = () => {
        console.log('-> Page2');
        this.props.history.push(book.page2);
    }
    render () {
        return (
            <div className = { 'App' }>
                <div className = { 'test12' }>
                    Page1
                    <div className = { 'p12' }>
                        <button onClick = { this._logout }>LogOut</button>
                        <button onClick = { this.page2 }>Page2</button>
                    </div>
                </div>
            </div>
        );
    }
}
