import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Vuetify);


new Vue({
  render: h => h(App),
}).$mount('#app');
