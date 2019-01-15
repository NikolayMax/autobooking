import { USER_REGISTER, USER_SUCCESS, USER_ERROR, USER_REQUEST } from '../actions/user.js';
import Vue from 'vue';
const HOST = 'http://localhost:3000';

export default {
    state:{
        f:1
    },
    getters:{

    },
    actions:{
        [USER_REGISTER]: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit(USER_REQUEST);

                Vue.http.post(HOST+'/user/register', user)
                    .then((response)=>{
                        const token = resp.data.token;
                        localStorage.setItem('user-token', token);
                        commit(USER_SUCCESS, token);
                        resolve(response)
                    })
                    .catch(err => {
                        commit(USER_ERROR, err);
                        localStorage.removeItem('user-token');
                        reject(err.body)
                    })
            })
        }
    },
    mutations:{
        [USER_REQUEST]: (state) => {
            state.status = 'loading'
        },
        [USER_SUCCESS]: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        [USER_ERROR]: (state) => {
            state.status = 'error'
        },
    }
}