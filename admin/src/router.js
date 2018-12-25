import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import store from './store';

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component:Home,
        beforeEnter: (to, from, next)=> {
            if(store.getters.isAuthenticated){
                next()
            }else{
                next('/login')
            }
        }
    },
    {path:'/login', component:Login},
    {path:'/register', component:Register},
];

export default new VueRouter({
    mode: 'history',
    routes
});