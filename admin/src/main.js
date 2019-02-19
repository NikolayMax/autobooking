import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import moment from 'moment';

import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App.vue'
import router from './router';
import store from './store'

Vue.use(VueResource);
Vue.http.options.credentials = true;
Vue.use(Vuetify);
Vue.PORT = '3000';
Vue.HOST = 'http://'+location.hostname+':'+Vue.PORT;
Vue.ORGID = 1;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});
Vue.filter('date',(value, template)=>moment(value).format(template));
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
