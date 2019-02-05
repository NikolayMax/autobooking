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
    {path:'/employees', component:Employees, meta:{title:'Сотрудники'}},
    {path:'/positions', component:Positions, meta:{title:'Должность'}},
    {path:'/cars', component:Cars, meta:{title:'Автомобили'}},
    {path:'/visits', component:Visits, meta:{title:'Визиты'}},
];

export default new VueRouter({
    mode: 'history',
    routes
});