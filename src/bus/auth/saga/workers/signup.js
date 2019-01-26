// Core
import { put } from 'redux-saga/effects';

// import { api } from '../../../../REST';
import { authAction } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* signup ({ payload: userInfo }) {
    try {
        yield put(uiActions.startFetching());
        // Adisey - Заглушка
        // const response = yield apply(api, api.auth.signup, [userInfo]);
        // const { data: profile, message } = yield apply(response, response.json);
        console.log('userInfo', userInfo);
        const response = {};
        const message = 'YYY';

        response.status = 200;
        response.status = 200;
        const profile = {
            id:        '14',
            firstName: 'AAA',
            lastName:  'BBB',
            avatar:    '',
            token:     'XXX',
        };
        // Adisey - Заглушка

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(profileActions.fillProfile(profile));
        yield put(authAction.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'signup fetchUsers'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
