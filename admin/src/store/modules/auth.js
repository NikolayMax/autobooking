import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth.js';
import Vue from 'vue';
const HOST = 'http://localhost:3000';

export default {
    state:{
        token: localStorage.getItem('user-token') || '',
        status: '',
    },
    getters:{
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },
    actions:{
        [AUTH_LOGOUT]: ({commit}) => {
            return new Promise((resolve) => {
                commit(AUTH_LOGOUT);
                localStorage.removeItem('user-token');
                resolve()
            })
        },
        [AUTH_REQUEST]: ({commit}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login

                commit(AUTH_REQUEST);

                Vue.http.post(HOST+'/user/login', JSON.stringify(user))
                    .then(resp => {
                        const token = resp.data;
                        localStorage.setItem('user-token', token);
                        commit(AUTH_SUCCESS, token);
                        resolve(resp)

                    })
                    .catch(err => {
                        commit(AUTH_ERROR, err.body);
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                        reject(err.body)
                    })
            })
        }
    },
    mutations:{
        [AUTH_REQUEST]: (state) => {
            state.status = 'loading'
        },
        [AUTH_SUCCESS]: (state, token) => {
            state.status = 'success';
            state.token = token
        },
        [AUTH_ERROR]: (state) => {
            state.status = 'error'
        },
    }
}