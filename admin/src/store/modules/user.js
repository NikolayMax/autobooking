import { USER_REGISTER, USER_SUCCESS, USER_ERROR, USER_REQUEST, USER_LOGIN, USER_LOGOUT,USER_IS_LOGIN } from '../actions/user';
import Vue from 'vue';
const HOST = 'http://localhost:3000';

export default {
    state:{
        user:{}
    },
    getters:{
        isAuthenticated:state => () => {
            console.log(state.user);
            return Object.keys(state.user).length > 0
        },
        user:store=>store.user,
    },
    actions:{
        [USER_IS_LOGIN]: ({commit}) => {
            Vue.http.get(`${Vue.HOST}/user/isAuth`)
                .then((res)=>{
                    if(res.data)
                        commit(USER_LOGIN, res.data);
                    else
                        commit(USER_LOGOUT);
                });
        },
        [USER_LOGIN]: ({commit}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login

                commit(USER_REQUEST);

                console.log(Vue.HOST);

                Vue.http.post(Vue.HOST+'/user/login', JSON.stringify(user))
                    .then(response => {
                        if(response.data)
                            commit(USER_LOGIN, response.data);
                        resolve(response)
                    })
                    .catch(err => {
                        commit(USER_ERROR, err.body);
                        reject(err.body)
                    })
            })
        },
        [USER_REGISTER]: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit(USER_REQUEST);

                Vue.http.post(Vue.HOST+'/user/register', user)
                    .then((response)=>{
                        const token = response.data.token;
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
        [USER_LOGIN]: (state, user) => {
            Vue.ORGID = user['organization_id'];
            state.user = user;
        },
        [USER_LOGOUT]: (state) => {
            state.user = {};
        },
        [USER_REQUEST]: (state) => {
            state.status = 'loading'
        },
        [USER_SUCCESS]: (state, token) => {
            state.status = 'success';
            state.token = token
        },
        [USER_ERROR]: (state) => {
            state.status = 'error'
        },
    }
}