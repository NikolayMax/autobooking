<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="show()">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="services">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-btn flat icon color="pink" @click="deleteService(props.item.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="changeService(props.item)">
                            <v-icon>create</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.duration }}</td>
                    <td>{{ props.item.price }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
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
                                            :label="labelDuration"
                                            v-model="duration"
                                            mask="##:##"
                                            persistent-hint
                                            required
                                            return-masked-value
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            :items="employees"
                                            v-model="selectedEmployees"
                                            :item-text="getNameEmployee"
                                            item-value="id"
                                            label="Выберите мастера для этой услуги"
                                            multiple
                                            return-object>
                                        <v-list-tile
                                                slot="prepend-item"
                                                ripple
                                                @click="toggle">
                                            <v-list-tile-title>Выбрать всё</v-list-tile-title>
                                        </v-list-tile>
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-treeview
                                            v-model="selectedCars"
                                            :items="cars"
                                            item-key="key"
                                            item-text="name"
                                            item-children="models"
                                            multiple-active
                                            selectable>
                                    </v-treeview>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*Поля обязательны</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close()">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="saveService()">Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import timeCalculated from '@/services/vue.time-calculated';

    export default {
        name: "Services",
        data () {
            return {
                dialog:false,
                search: '',
                headers: [
                    { text: '#', value: 'settings' },
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
                id:null,
                method:'post',
                selectedCars: [],
                selectedEmployees:[],
                tree:[],
                name:null,
                price:null,
                duration:null
            }
        },
        methods:{

            getNameEmployee:item => `${item.lastname} ${item.firstname} ${item.patronymic}`,
            show(){
                this.method = 'post';
                this.dialog = true;
                this.id = null;
            },
            close(){
                this.dialog = false;
                this.name = '';
                this.price = '';
                this.duration = '';
                this.selectedEmployees = [];
                this.selectedCars = [];
            },
            toggle () {
                this.$nextTick(() => {
                    if (this.allEmployees) {
                        this.selectedEmployees = []
                    } else {
                        this.selectedEmployees = this.employees.slice()
                    }
                })
            },
            deleteService(id){
                this.$http.delete(`${Vue.HOST}/services/${Vue.ORGID}/${id}`)
                    .then(()=>{
                        this.dialog=false;
                        return this.getServices();
                    })
                    .then(response=>{
                        this.services = response.data;
                    })
                    .catch(err=>console.log(err));
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
            changeService(service){

                this.dialog = true;
                this.id = service.id;
                this.name = service.name;
                this.price = service.price;
                this.duration = service.duration;
                this.selectedEmployees = service.employees;
                this.method = 'put';
                let models = [];
                this.cars.forEach(car =>{
                    car.models.forEach(model=>{
                        let res = service.models.find(mdl=>mdl.id == model.id);
                        if(res)
                            models.push(res.id);
                    })
                });
                this.selectedCars = models;
            },
            saveService(){
                let {name, duration, price, selectedCars, selectedEmployees, id, method, cars} = this,
                serviceId=null;

                selectedEmployees = selectedEmployees.map(employee=>employee.id);

                this.$http[method](`${Vue.HOST}/services/${Vue.ORGID}`, {name, duration, price, id})
                    .then((response)=>{
                        this.dialog=false;
                        serviceId =  id || response.data.insertId;

                        return this.$http[method](`${Vue.HOST}/services-models/${Vue.ORGID}`, {serviceId:serviceId, models:selectedCars})
                    })
                    .then(response=>this.$http[method](`${Vue.HOST}/services-employees/${Vue.ORGID}`, {serviceId:serviceId, employees:selectedEmployees}))
                    .then(response=>this.getServices())
                    .then(response=>{
                        this.services = response.data;
                    })
                    .catch(err=>console.log(err));
            }
        },
        computed: {
            allEmployees () {
                return this.selectedEmployees.length === this.employees.length
            },
            labelDuration(){
                if(this.duration){
                    return `Продолжительность вашей услуги ${timeCalculated.minutesFormatted(this.duration)}`;
                }else{
                    return `Продолжительность чч:мм`;
                }
            },
        },

        mounted(){
            this.getServices()
                .then(response=>{
                    this.services = response.data;
                    return this.getCars();
                })
                .then(response=>{
                    let cars = response.data;

                    let index=0;
                    cars.forEach(car=>{
                        car.key = index++;
                        car.models.forEach(model=>{
                            model.key = index++;
                        })
                    });

                    this.cars = cars;

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