import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App.vue'
import router from './router';
import store from './store'

Vue.use(VueResource);
Vue.use(Vuetify);
Vue.HOST = 'http://localhost';
Vue.ORGID = 1;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
