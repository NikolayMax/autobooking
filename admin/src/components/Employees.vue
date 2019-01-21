<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="dialog=true">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="employees"
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.firstname }} {{ props.item.lastname }} {{ props.item.patronymic }}</td>
                    <td>{{ props.item.phone }}</td>
                    <td>{{ props.item.email }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Добавить сотрудника</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Фамилия" required v-model="lastname"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Имя*" v-model="firstname"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                            label="Отчество"
                                            v-model="patronymic"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Телефон*" required v-model="phone"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Email*" v-model="email"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            :items="positions"
                                            v-model="position"
                                            label="Должность"
                                            item-text="name"
                                            item-value="id"
                                            required>
                                    </v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*Поля обязательны</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Employees",
        data () {
            return {
                dialog:false,
                search: '',
                headers: [
                    {
                        text: 'Имя сотрудника',
                        align: 'left',
                        value: 'name'
                    },
                    { text: 'Должность', value: 'position' },
                    { text: 'Дата рождения', value: 'birthdate' },
                ],
                employees: [],
                positions:[],
                selectPosition:null,
            }
        },
        methods:{
            getPositions(){
                return this.$http.get(`${Vue.HOST}/positions/${Vue.ORGID}`)
            },
            getEmployees(){
                return this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`)
            },
            saveEmployee(){
                let {firstname, lastname, patronymic, phone, password, position, email} = this;

                this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`, {firstname, lastname, patronymic, phone, password, position, email})
                    .then(()=>{
                        return this.getEmployees();
                    })
                    .then(response=>{
                        this.employees = response.data;
                    })
                    .catch(err=>console.log(err));
            }
        },
        mounted(){
            this.getPositions()
                .then(response=>{
                    this.positions = response.data;
                    return this.getEmployees()
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