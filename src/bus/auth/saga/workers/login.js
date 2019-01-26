// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// import { api } from '../../../../REST/index';
import { authAction } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';
import { notificationActions } from '../../../notification/actions';

export function* login ({ payload: credentials }) {
    try {
        yield put(uiActions.startFetching());
        // const response = yield apply(api, api.auth.login, [credentials]);
        // const { profile, message } = yield apply(response, response.json);
        const response = {};

        response.status = 200;
        const profile = {
            token:     '012345678909876543210',
            firstName: 'Смирнов',
            lastName:  'Андрей',
            id:        '456',
        };
        const message = 'Всё путём !';

        if (response.status !== 200) {
            throw new Error(message);
        }

        if (credentials.remember) {
            yield apply(localStorage, localStorage.setItem, ['remember', true]);
            yield apply(localStorage, localStorage.setItem, ['token', profile.token]);
        }
        yield put(profileActions.fillProfile(profile));
        yield put(actions.change('forms.user.profile.firstName', profile.firstName));
        yield put(actions.change('forms.user.profile.lastName', profile.lastName));
        yield put(authAction.authenticate());
        yield put(notificationActions.showNotification('Добро пожаловать!'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'Login worker failed'));
        yield put(
            notificationActions.showNotification(
                'Неправильные Login или Пароль!',
                'error',
                'loginWorker'
            )
        );
    } finally {
        yield put(uiActions.stopFetching());
    }
}
