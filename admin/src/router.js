import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Employees from './components/Employees.vue';
import Services from './components/Services.vue';
import Positions from './components/Positions.vue';
import Cars from './components/Cars.vue';
import Visits from './components/Visits.vue';
import Booking from './components/Booking.vue';

import store from './store';

Vue.use(VueRouter);
let isAuth = (to, from, next)=> {
    if(store.getters.isAuthenticated()){
        next()
    }else{
        next('/login')
    }
};
const routes = [
    {
        path:'/',
        component:Home,
        beforeEnter: isAuth
    },
    {path:'/login', component:Login, meta:{title:'Авторизация'}},
    {path:'/services', component:Services, meta:{title:'Услуги'}, beforeEnter: isAuth},
    {path:'/register', component:Register, meta:{title:'Регистрация'}},
    {path:'/employees', component:Employees, meta:{title:'Сотрудники'}, beforeEnter: isAuth},
    {path:'/positions', component:Positions, meta:{title:'Должность'}, beforeEnter: isAuth},
    {path:'/cars', component:Cars, meta:{title:'Автомобили'}, beforeEnter: isAuth},
    {path:'/visits', component:Visits, meta:{title:'Визиты'}, beforeEnter: isAuth},
    {path:'/booking', component:Booking, meta:{title:'Онлайн Запись 2.0'}, beforeEnter: isAuth},
];

export default new VueRouter({
    mode: 'history',
    base: '/admin/dist/',
    routes
});