// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

// Styles
import './styles.scss';
// Instruments
import { login } from './shapes';
import { book } from '../../navigation/book';

// Actions
import { authAction } from '../../bus/auth/actions';

const mapStateToProps = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};
const mapDispathToProps = {
    loginAsync: authAction.loginAsync,
};

export default
@withRouter
@connect(
    mapStateToProps,
    mapDispathToProps
)
class LoginForm extends Component {
    _submitLoginForm = (user) => {
        console.log(`user ->`, user);
        this.props.loginAsync(user);
    }
    renderRedirect = () => {
        console.log('++++++++++++ book.signUp', book.signUp);
        this.props.history.push(book.signUp);
    }

    render () {
        const { isFetching } = this.props;

        return (
            <div>
                <Formik
                    initialValues = { login.shape }
                    render = { (props) => {
                        const { isValid, touched, errors } = props;

                        const centeredWrapperStyle = cx('wrapper', 'centered', {
                            ['disabledInput']: isFetching,
                        });
                        const emailStyle = cx({
                            ['invalidInput']: !isValid && touched.email && errors.email,
                        });
                        const passwordStyle = cx({
                            ['invalidInput']: !isValid && touched.password && errors.password,
                        });
                        const submitButtonStyle = cx('loginSubmit', {
                            ['disabledButton']: isFetching,
                        });
                        const submitButtonMessage = isFetching ? 'Загрузка...' : 'Войти';
                        const signupButtonMessage = isFetching
                            ? 'Загрузка...'
                            : 'Зарегистрироваться';
                        const signupButtonStyle = cx('signupSubmit', {
                            ['disabledButton']: isFetching,
                        });

                        return (
                            <Form className = { 'form' }>
                                <div className = { centeredWrapperStyle }>
                                    <div>
                                        <Field
                                            className = { emailStyle }
                                            disabled = { isFetching }
                                            name = 'email'
                                            placeholder = 'Почта'
                                            type = 'email'
                                        />
                                        <Field
                                            className = { passwordStyle }
                                            disabled = { isFetching }
                                            name = 'password'
                                            placeholder = 'Пароль'
                                            type = 'password'
                                        />
                                        <label className = { 'rememberMe' }>
                                            <Field
                                                checked = { props.values.remember }
                                                name = 'remember'
                                                type = 'checkbox'
                                            />
                                            Запомнить меня
                                        </label>
                                        <button
                                            className = { submitButtonStyle }
                                            disabled = { isFetching }
                                            type = 'submit'>
                                            {submitButtonMessage}
                                        </button>
                                        <button
                                            className = { signupButtonStyle }
                                            disabled = { isFetching }
                                            type = 'button'
                                            onClick = { this.renderRedirect }>
                                            {signupButtonMessage}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    } }
                    validationSchema = { login.schema }
                    onSubmit = { this._submitLoginForm }
                />
            </div>
        );
    }
}
