// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';
// Instruments
import './styles.scss';
import { signup } from './shapes';

// Actions
import { authAction } from '../../bus/auth/actions';

const mapStateToProps = (state) => {
    console.log(`state (Signup)->`, state);

    return {
        isFetching: state.ui.get('isFetching'),
    };
};
const mapDispathToProps = {
    signupAsync: authAction.signupAsync,
};

export default
@connect(
    mapStateToProps,
    mapDispathToProps
)
class SignupForm extends Component {
    _submitSignupForm = (user) => {
        this.props.signupAsync(user);
    }

    render () {
        const { isFetching } = this.props;

        console.log(`isFetching (Signup) ->`, isFetching);
        console.log(`this.props (Signup) ->`, this.props);

        return (
            <Formik
                initialValues = { signup.shape }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const centeredWrapperStyle = cx('wrapper', 'centered', {
                        ['disabledInput']: isFetching,
                    });
                    const firstNameStyle = cx({
                        ['invalidInput']: !isValid && touched.firstName && errors.firstName,
                    });
                    const lastNameStyle = cx({
                        ['invalidInput']: !isValid && touched.lastName && errors.lastName,
                    });
                    const emailStyle = cx({
                        ['invalidInput']: !isValid && touched.email && errors.email,
                    });
                    const passwordStyle = cx({
                        ['invalidInput']: !isValid && touched.password && errors.password,
                    });
                    const inviteStyle = cx({
                        ['invalidInput']: !isValid && touched.invite && errors.invite,
                    });
                    const buttonStyle = cx('signupSubmit', {
                        ['disabledButton']: isFetching,
                    });
                    const buttonMessage = isFetching ? 'Загрузка...' : 'Создать аккаунт ✓';

                    return (
                        <Form className = { 'form' }>
                            <div className = { centeredWrapperStyle }>
                                <div>
                                    <Field
                                        className = { firstNameStyle }
                                        disabled = { isFetching }
                                        name = 'firstName'
                                        placeholder = 'Имя'
                                        type = 'text'
                                    />
                                    <Field
                                        className = { lastNameStyle }
                                        disabled = { isFetching }
                                        name = 'lastName'
                                        placeholder = 'Фамилия'
                                        type = 'text'
                                    />
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
                                    <Field
                                        className = { inviteStyle }
                                        disabled = { isFetching }
                                        name = 'invite'
                                        placeholder = 'Секретное слово'
                                        type = 'password'
                                    />
                                    <button
                                        className = { buttonStyle }
                                        disabled = { isFetching }
                                        type = 'submit'>
                                        {buttonMessage}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { signup.schema }
                onSubmit = { this._submitSignupForm }
            />
        );
    }
}
