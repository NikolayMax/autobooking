
<template>
    <div class="one-step">
        <v-select
                xs12 sm12
                v-model="car"
                :items="cars"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите марку">
        </v-select>
        <v-select
                xs12 sm12
                v-model="model"
                :items="car.models"
                item-text="name"
                item-value="id"
                v-on:change="getServices(car.id, model.id)"
                return-object
                label="Выберите модель">
        </v-select>
        <v-select
                xs12 sm12
                v-model="selectedServices"
                :items="services"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите услугу"
                multiple>
            <template
                    slot="selection"
                    slot-scope="{ item, index }">
            <span
                    v-if="index === 0"
                    class="grey--text caption"
            > + ({{ selectedServices.length }} Выбрано)</span>
            </template>
            <template slot="item" slot-scope="data">
                <v-flex>
                    {{ data.item.name }}
                    <span style="float:right;">{{ data.item.price }} р.</span>
                </v-flex>
            </template>
        </v-select>
        <div class="title mb-2">Выберите мастера</div>

        <v-layout row wrap>
            <v-flex v-for="(employee, index) in employees" :key="index" xs2 @click="selectEmployee(employee)" style="position: relative;">
                <v-card>
                    <v-btn fab small color="primary" class="employee-icon-selected" v-show="employee.selected">
                        <v-icon light>done</v-icon>
                    </v-btn>

                    <v-img :src="`https://picsum.photos/500/300?image=${index * 5 + 10}`"></v-img>
                    <div class="px-1">{{employee.firstname}} {{employee.lastname}}</div>
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

    export default{
        name:'OneStep',
        methods:{
            getCars(){
                return this.$http.get(`${Vue.HOST}/cars/${Vue.ORGID}`)
            },
            getServices: function(car, model){
                this.$http.get(`${Vue.HOST}/services/${Vue.ORGID}`, {params:{car, model}})
                    .then(response=>{
                        this.services = response.data;
                    })
            },
            selectEmployee(employee){

                if(this.oldSelectedEmployee)
                    this.oldSelectedEmployee.selected=false;

                employee.selected = true;

                this.$store.dispatch(SET_EMPLOYEE, employee);

                this.oldSelectedEmployee = employee;
            }
        },
        computed: {
            selectedServices: {
                get() {
                    return this.$store.state.selected.services
                },
                set(newValue) {
                    return this.$store.dispatch(SET_SERVICE, newValue)
                }
            },
            car: {
                get() {
                    return this.$store.state.selected.car
                },
                set(newValue) {
                    return this.$store.dispatch(SET_CAR, newValue)
                }
            },
            model: {
                get() {
                    return this.$store.state.selected.model
                },
                set(newValue) {
                    return this.$store.dispatch(SET_MODEL, newValue)
                }
            },
        },
        mounted: function () {
            this.getCars()
                .then(response=>{
                    this.cars = response.data;
                    return this.$store.dispatch('getEmployees')
                })
                .then(employees=>{
                    console.log(employees)
                    this.employees = employees;
                })
                .catch(error=>console.log(error));
        },
        data: () => ({
            cars:[],
            services: [],
            mark:[],
            employees:[],
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
</style>