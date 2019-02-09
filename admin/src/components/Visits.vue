<template>
    <div>
        <v-card>
            <v-data-table
                    :headers="headers"
                    :items="visits">
                <template slot="items" slot-scope="props">
                    <tr @click="showVisit(props.item.id)">
                        <td>№{{ props.item.id }}</td>
                        <td>{{ props.item.date | date('MM/DD/YYYY')}} </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="900px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Визит № {{visitID}}</span>
                    </v-card-title>
                    <v-card-text ref="form">
                        <div class="title mb-3">Клиент</div>
                            <v-layout >
                                <v-flex xs4 sm4>
                                    <v-text-field
                                            v-model="client.lastname"
                                            value="Фамилия"
                                            label="Фамилия"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4>
                                    <v-text-field
                                            v-model="client.firstname"
                                            value="Имя"
                                            label="Имя"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4>
                                    <v-text-field
                                            v-model="client.patronymic"
                                            label="Отчество"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4>
                                    <v-text-field
                                            v-model="client.phone"
                                            label="Телефон"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        <div class="title mt-3">Услуги</div>
                        <v-data-table
                                :headers="headersItems"
                                :items="visitItems">
                            <template slot="items" slot-scope="props">
                                <td>№{{ props.item.id }}</td>
                                <td>{{ props.item.service_name}} </td>
                                <td>{{ props.item.service_duration}} </td>
                                <td>{{ props.item.service_pay_sum}} </td>
                                <td>{{ props.item.name_car}} {{ props.item.name_model}}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Visits",
        data () {
            return {
                headers: [
                    {
                        text: 'Визит №',
                        align: 'left',
                        value: 'position'
                    },
                    { text: 'Дата', value: 'date' },
                ],
                headersItems: [
                    {
                        text: '№',
                        align: 'left',
                        value: 'position'
                    },
                    { text: 'Название услуги', value: 'name' },
                    { text: 'Продолжительность', value: 'name' },
                    { text: 'Цена', value: 'name' },
                    { text: 'Название автомобиля и модели', value: 'name' },
                ],
                dialog:false,
                visits:[],
                client:{},
                visitItems:[],
                visitID:null
            }
        },
        methods:{
            showVisit(visitId){
                this.$http.get(`${Vue.HOST}/visit/items/${Vue.ORGID}`, {params:{visitId}})
                    .then(response=>{
                        this.visitItems = response.data;
                        return this.$http.get(`${Vue.HOST}/visit/client/${Vue.ORGID}`, {params:{visitId}})
                    })
                    .then(response=>{
                        this.dialog=true;
                        this.visitID=visitId;
                        this.client = response.data;
                    })
            }
        },
        mounted:function(){
            this.$http.get(`${Vue.HOST}/visit/${Vue.ORGID}`)
                .then(response=>{
                    this.visits = response.data;
                })
        }
    }
</script>

<style scoped>

</style>