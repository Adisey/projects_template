import { MAIN_URL } from './config';

export const api = {
    get token () {
        console.log(`API -> localStorage.getItem('token') ->`, localStorage.getItem('token'));

        return localStorage.getItem('token');
    },
    auth: {
        signup (userInfo) {
            return fetch(`${MAIN_URL}/user/`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
        },
        login (credentials) {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
        },
        authenticate () {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: this.token }),
            });
        },
        logout () {
            return fetch(`${MAIN_URL}/user/logout`, {
                method:  'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },
    },
    profile: {
        updateProfile (profileInfo) {
            return fetch(`${MAIN_URL}/user`, {
                method:  'PUT',
                headers: {
                    Authorization:  this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileInfo),
            });
        },
        updateAvatar (avatarFormData) {
            return fetch(`${MAIN_URL}/image`, {
                method:  'POST',
                headers: {
                    Authorization: this.token,
                },
                body: avatarFormData,
            });
        },
    },
    users: {
        fetch () {
            return fetch(`${MAIN_URL}/user/all`, {
                method:  'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },
    },
};
