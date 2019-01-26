//Core
import { all, call } from 'redux-saga/effects';

// Wathers
import { watchAuth } from '../bus/auth/saga/watchers';
import { watchProfile } from '../bus/profile/saga/watchers';

export function* rootSaga () {
    yield all([call(watchAuth), call(watchProfile)]);
    // yield all([]);
}
