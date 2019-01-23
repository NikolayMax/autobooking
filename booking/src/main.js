import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';

Vue.PORT = 3000;
Vue.HOST = `http://localhost:${Vue.PORT}`;
Vue.ORGID = `1`;
Vue.use(VueResource);
Vue.use(Vuetify);


new Vue({
  render: h => h(App),
}).$mount('#app');
