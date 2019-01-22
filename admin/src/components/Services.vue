<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="dialog=true">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="services">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.duration }}</td>
                    <td>{{ props.item.price }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Добавить услугу</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Нзвание" required v-model="name"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Цена*" v-model="price"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Продолжительность"
                                            v-model="duration"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*Поля обязательны</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="saveService()">Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Services",
        data () {
            return {
                dialog:false,
                search: '',
                headers: [
                    {
                        text: 'Название',
                        align: 'left',
                        value: 'name'
                    },
                    { text: 'Продолжительность', value: 'duration' },
                    { text: 'Цена', value: 'price' },
                ],
                services: [],
                name:null,
                price:null,
                duration:null
            }
        },
        methods:{
            getServices(){
                return this.$http.get(`${Vue.HOST}/services/${Vue.ORGID}`)
            },
            saveService(){
                let {name, duration, price} = this;
                console.log(name, duration, price);

                this.$http.post(`${Vue.HOST}/services/${Vue.ORGID}`, {name, duration, price})
                    .then(()=>{
                        this.dialog=false;
                        return this.getServices();
                    })
                    .then(response=>{
                        this.services = response.data;
                    })
                    .catch(err=>console.log(err));
            }
        },
        mounted(){
            this.getServices()
                .then(response=>{
                    this.services = response.data;
                })
                .catch(err=>console.log(err))
        }
    }
</script>

<style scoped>

</style>