
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
    import {SET_SERVICE, SET_CAR, SET_MODEL} from '../store/actions/selected';
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
                })
                .catch(error=>console.log(error));
        },
        data: () => ({
            cars:[],
            services: [],
            mark:[],
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