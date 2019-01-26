// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

import { api } from '../../../../REST/index';
import { authAction } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from "../../../profile/actions";

export function* authenticate () {
    try {
        yield put(uiActions.startFetching());
        const response = yield apply(api, api.auth.authenticate);
        const { data: profile, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            if (response.status === 401) {
                yield apply(localStorage, localStorage.removeItem, ['token']);
                yield apply(localStorage, localStorage.removeItem, ['remember']);

                return null;
            }
            throw new Error(message);
        }
        yield apply(localStorage, localStorage.setItem, ['token', profile.token]);
        yield put(profileActions.fillProfile(profile));
        yield put(actions.change('forms.user.profile.firstName', profile.firstName));
        yield put(actions.change('forms.user.profile.lastName', profile.lastName));

        yield put(authAction.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'Authenticate Login worker'));
    } finally {
        yield put(uiActions.stopFetching());
        yield put(authAction.initialialze());

    }
}