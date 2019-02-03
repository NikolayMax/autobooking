import { SET_LASTNAME, SET_FIRSTNAME, SET_PATRONYMIC, SET_PHONE } from '../actions/user';

export default {
    state:{
        firstname:'',
        lastname:'',
        patronymic:'',
        phone:''
    },
    getters:{

    },
    actions:{
        [SET_LASTNAME]: ({commit, state}, lastname) => {
            commit(SET_LASTNAME, lastname);
            return state.lastname
        },
        [SET_FIRSTNAME]: ({commit, state}, firstname) => {
            commit(SET_FIRSTNAME, firstname);
            return state.firstname
        },
        [SET_PATRONYMIC]: ({commit, state}, patronymic) => {
            commit(SET_PATRONYMIC, patronymic);
            return state.patronymic
        },
        [SET_PHONE]: ({commit, state}, phone) => {
            commit(SET_PHONE, phone);
            return state.phone
        }
    },
    mutations:{
        [SET_LASTNAME]: (state, lastname) => {
            state.lastname = lastname;
        },
        [SET_FIRSTNAME]: (state, firstname) => {
            state.firstname = firstname;
        },
        [SET_PATRONYMIC]: (state, patronymic) => {
            state.patronymic = patronymic;
        },
        [SET_PHONE]: (state, phone) => {
            state.phone = phone;
        },
    }
}