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
                                    <v-text-field label="Название" required v-model="name"></v-text-field>
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
                                <v-flex xs12>
                                    <v-select
                                            v-model="selectedEmployees"
                                            :items="employees"
                                            :item-name="`item`"
                                            label="Выберите мастера для этой услуги"
                                            multiple>
                                        <v-list-tile
                                                slot="prepend-item"
                                                ripple
                                                @click="toggle">
                                            <v-list-tile-action>
                                                <v-icon :color="selectedCars.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>Выбрать всё</v-list-tile-title>
                                        </v-list-tile>
                                        <v-divider
                                                slot="prepend-item"
                                                class="mt-2"
                                        ></v-divider>
                                        <v-divider
                                                slot="append-item"
                                                class="mb-2"
                                        ></v-divider>
                                        <v-list-tile
                                                slot="append-item"
                                                disabled>
                                        </v-list-tile>
                                    </v-select>
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
                employees:[],
                cars:[],
                selectedCars: [],
                selectedEmployees:[],
                name:null,
                price:null,
                duration:null
            }
        },
        methods:{
            toggle () {
                this.$nextTick(() => {
                    if (this.likesAllFruit) {
                        this.selectedCars = []
                    } else {
                        this.selectedCars = this.cars.slice()
                    }
                })
            },
            getName(employee){
                console.log(employee);
                return `${employee.firstname} ${employee.lastname} ${employee.patronymic}`;
            },
            getServices(){
                return this.$http.get(`${Vue.HOST}/services/${Vue.ORGID}`)
            },
            getEmployee(){
                return this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`)
            },
            getCars(){
                return this.$http.get(`${Vue.HOST}/cars/${Vue.ORGID}`)
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
        computed: {
            likesAllFruit () {
                return this.selectedCars.length === this.cars.length
            },
            likesSomeFruit () {
                return this.selectedCars.length > 0 && !this.likesAllFruit
            },
            icon () {
                if (this.likesAllFruit) return 'mdi-close-box'
                if (this.likesSomeFruit) return 'mdi-minus-box'
                return 'mdi-checkbox-blank-outline'
            }
        },

        mounted(){
            this.getServices()
                .then(response=>{
                    this.services = response.data;
                    return this.getCars();
                })
                .then(response=>{
                    let cars = response.data;

                    this.cars = cars.map(car=>{
                        if(car.models)
                            return car.models.map(model=>({id:car.id,name:`${car.name} - ${model.name}`, modelName:model.name}));
                        else
                            return car;
                    });
                    return this.getEmployee();
                })
                .then(response=>{
                    this.employees = response.data;
                })
                .catch(err=>console.log(err))
        }
    }
</script>

<style scoped>

</style>