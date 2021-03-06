// Core
import { put, apply } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST/index';
import { authAction } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';
import { book } from '../../../../navigation/book';
import { notificationActions } from '../../../notification/actions';

export function* logout () {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.auth.logout);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'Logout worker error'));
    } finally {
        yield put(notificationActions.showNotification('Приходите ещё!'));
        yield apply(localStorage, localStorage.removeItem, ['token']);
        yield apply(localStorage, localStorage.removeItem, ['remember']);
        yield put(profileActions.clearProfile());
        yield put(uiActions.stopFetching());
        yield put(actions.reset('forms.user'));
        yield put(authAction.logout());
        yield put(replace(book.login));
    }
}
