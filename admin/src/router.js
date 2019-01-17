import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Services from './components/Services.vue';
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
    {path:'/login', component:Login, meta:{title:'Авторизация'}},
    {path:'/services', component:Services, meta:{title:'Услуги'}},
    {path:'/register', component:Register, meta:{title:'Регистрация'}},
];

export default new VueRouter({
    mode: 'history',
    routes
});