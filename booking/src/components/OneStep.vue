
<template>
    <div class="one-step">
        <v-select
                xs12 sm12
                v-model="car"
                :items="cars"
                item-text="name"
                item-value="id"
                v-on:change="resetService()"
                return-object
                label="Выберите марку">
        </v-select>
        <v-select
                xs12 sm12
                v-model="model"
                :items="car.models"
                item-text="name"
                item-value="id"
                v-on:change="filterModelServices(model.id)"
                return-object
                label="Выберите модель">
        </v-select>
        <v-select
                xs12 sm12
                v-model="selectedServices"
                :items="services.filter(service=>service.show)"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите услугу"
                multiple>
            <template
                    slot="selection"
                    slot-scope="{ item, index }">
            <span v-if="index === 0"
                  class="grey--text caption"> + ({{ selectedServices.length }} Выбрано)</span>
            </template>
            <template slot="item" slot-scope="data">
                <v-flex>
                    {{ data.item.name }}
                    <span style="float:right;">{{ data.item.price }} р.</span>
                </v-flex>
            </template>
        </v-select>
        <div class="title mb-2" v-show="objectLength(employees)">Мастера оказывают услуги которые вы выбрали</div>

        <v-layout row wrap v-show="objectLength(employees)">
            <v-flex v-for="(employee, index) in employees" :key="index" xs2 @click="selectEmployee(employee)" class="relative mr-2">
                <v-card>
                    <v-btn fab small color="primary" class="employee-icon-selected" v-show="employee.selected">
                        <v-icon light>done</v-icon>
                    </v-btn>

                    <v-img src="http://simpleicon.com/wp-content/uploads/user1.png"></v-img>
                    <div class="px-1 truncate">{{employee.firstname}} {{employee.lastname}}</div>
                </v-card>
            </v-flex>
        </v-layout>

        <div class="title pb-4 pt-5" >Выбранные услуги</div>
        <v-data-table
                :headers="headers"
                :items="selectedServices"
                class="elevation-2"
                hide-actions
                no-data-text
                hide-headers>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.price }} р.</td>
            </template>
            <template slot="footer">
                <td>
                    <strong>Сумма</strong>
                </td>
                <td class="text-xs-right">
                    <strong>{{selectedServices.reduce((a1,a2)=>a1+a2.price, 0)}} р.</strong>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import {SET_SERVICE, SET_CAR, SET_MODEL, SET_EMPLOYEE} from '../store/actions/selected';
    import Vue from 'vue';
    import _ from 'lodash';

    export default{
        name:'OneStep',
        methods:{
            filterModelServices(id){
                this.selectedServices = [];
                this.services.forEach(service=>{
                    service.show = service.cars.some(car => car.models.some(model => model.id === id));
                })
            },
            objectLength(obj){
                return Object.keys(obj).length;
            },
            resetService(){
                this.selectedServices = [];
                this.services.forEach(service=>{
                    service.show = true;
                })
            },
            getCars(){
                return this.$http.get(`${Vue.HOST}/cars/${Vue.ORGID}`)
            },
            getServices(){
                return this.$store.dispatch('getServices')
            },
            selectEmployee(employee){

                if(this.oldSelectedEmployee)
                    this.oldSelectedEmployee.selected=false;

                employee.selected = true;

                this.$store.dispatch(SET_EMPLOYEE, employee);

                this.oldSelectedEmployee = employee;
                console.log(employee)
            }
        },
        computed: {
            selectedServices: {
                get: function(){return this.$store.state.selected.services},
                set: function(services){
                    this.employees = {};
                    let employees = {};
                    services.forEach(service=>{

                        service.employees.forEach(employee=>{
                            if(!employees[employee.id])
                                employees[employee.id] = {
                                    count:1,
                                    employee,
                                };
                            else
                                employees[employee.id].count++;
                        })
                    });
                    this.employees = Object.values(employees).filter(employee => employee.count === services.length).map(employee => employee.employee);

                    return this.$store.dispatch(SET_SERVICE, services)
                }
            },
            car: {
                get: function(){return this.$store.state.selected.car},
                set: function(value){return this.$store.dispatch(SET_CAR, value)}
            },
            model: {
                get: function(){return this.$store.state.selected.model},
                set: function(value){return this.$store.dispatch(SET_MODEL, value)}
            },
        },
        mounted: function () {
            this.getServices()
                .then(services=>{
                    let cars = {};
                    this.services = services.map(service=>{
                        service.show=true;
                        service.cars.forEach(car => {
                            cars[car.id] = car;
                        });
                        return service;
                    });
                    this.cars = Object.values(cars);
                })
                .catch(error=>console.log(error));
        },
        data: () => ({
            cars:[],
            services: [],
            models:[],
            employees:{},
            oldSelectedEmployee:{},
            headers: [
                {
                    text: 'Название',
                    value: 'name'
                },
                { text: 'Цена', value: 'price',align:'right' }
            ],
        })
    }
</script>
<style scoped>
    .employee-icon-selected{
        width:25px;
        height:25px;
        position: absolute;
        top:0;
        z-index: 2;
        padding: 0;
    }
    .truncate{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>