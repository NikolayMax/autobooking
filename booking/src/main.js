import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';

import store from './store'

Vue.PORT = 3000;
Vue.HOST = `http://localhost:${Vue.PORT}`;
let urlParams = new URLSearchParams(window.location.search);

Vue.ORGID = urlParams.get('orgid');
Vue.use(VueResource);
Vue.use(Vuetify);


new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
