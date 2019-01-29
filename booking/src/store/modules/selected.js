import { SET_SERVICE, SET_CAR, SET_MODEL } from '../actions/selected';

export default {
    state:{
        car:{},
        model:{},
        services:[],
        date:null,
        time:null,
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
    }
}