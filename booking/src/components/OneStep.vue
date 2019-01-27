
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
                v-on:change="setService"
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
        <div class="v-label theme--light mb-3">Выберите мастера</div>
        <v-layout row wrap>
            <v-flex
                    v-for="(empl, n) in employees"
                    @click="employee = empl"
                    :key="n"
                    xs2
                    d-flex>
                <v-card>
                    <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
                            class="grey lighten-2">
                        <v-avatar color="blue" size="30" class="mt-2 ml-2" v-show="empl.id === employee.id">
                            <v-icon dark size="20">done</v-icon>
                        </v-avatar>
                    </v-img>
                    <v-card-actions class="white caption font-weight-thin">
                        {{empl.firstname}} {{empl.lastname}}
                    </v-card-actions>
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
    import Vue from 'vue';

    export default{
        name:'OneStep',
        methods:{
            setService(services){

                this.getEmployees(services.map(service=>service.id), this.model.id)
                    .then(response=>{
                        this.employees = response.data;
                    })

            },
            setEmployee(employee){
                this.employee = employee;
            },
            getCars(){
                return this.$http.get(`${Vue.HOST}/cars/${Vue.ORGID}`)
            },
            getServices: function(car, model){
                this.$http.get(`${Vue.HOST}/services/${Vue.ORGID}`, {params:{car, model}})
                    .then(response=>{
                        this.services = response.data;
                    })
            },
            getEmployees: function(serviceIds, model){
                return this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`, {params:{serviceIds, model}})
            }
        },
        mounted: function () {
            this.getCars()
                .then(response=>{
                    this.cars = response.data;
                    return this.getEmployees()
                })
                .then(response=>{
                    this.employees = response.data;
                })
                .catch(error=>console.log(error));
        },
        data: () => ({
            cars:[],
            car:{},
            models:[],
            services: [],
            employees:[],
            employee:{},
            selectedServices: [],
            mark:[],
            model:[],
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