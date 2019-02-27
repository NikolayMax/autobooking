import Vue from 'vue';
import Vuex from 'vuex';

import selected from './modules/selected';
import user from './modules/user';
import times from './modules/times';
import employees from './modules/employees';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        selected,
        times,
        user,
        employees
    },
})