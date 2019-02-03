import Vue from 'vue';
import Vuex from 'vuex';

import selected from './modules/selected';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        selected,
        user
    }
})