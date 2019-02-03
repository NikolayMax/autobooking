import { SET_SERVICE, SET_CAR, SET_MODEL, SET_DATE, SET_TIME } from '../actions/selected';

export default {
    state:{
        car:{},
        model:{},
        services:[],
        date:new Date().toISOString().substr(0, 10),
        time:{},
    },
    getters:{

    },
    actions:{
        [SET_SERVICE]: ({commit}, services) => {
           commit(SET_SERVICE, services);
           return services
        },
        [SET_CAR]: ({commit, state}, car) => {
           commit(SET_CAR, car);
           return state.car
        },
        [SET_MODEL]: ({commit, state}, model) => {
           commit(SET_MODEL, model);
           return state.model
        },
        [SET_DATE]: ({commit, state}, date) => {
           commit(SET_DATE, date);
           return state.date
        },
        [SET_TIME]: ({commit, state}, time) => {
            commit(SET_TIME, time);
            return state.time
        }
    },
    mutations:{
        [SET_SERVICE]: (state, services) => {
            state.services = services;
        },
        [SET_CAR]: (state, car) => {
            state.car = car;
        },
        [SET_MODEL]: (state, model) => {
            state.model = model;
        },
        [SET_DATE]: (state, date) => {
            state.date = date;
        },
        [SET_TIME]: (state, time) => {
            state.time = time;
        },
    }
}