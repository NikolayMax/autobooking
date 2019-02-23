<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="show()">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="employees"
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-btn flat icon color="pink" @click="deleteEmployee(props.item.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="changeEmployee(props.item)">
                            <v-icon>create</v-icon>
                        </v-btn>
                    </td>
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
                                    <v-text-field label="Телефон*" required mask="7(###) ### - ####" v-model="phone"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Email*" v-model="email"></v-text-field>
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
                        <v-btn color="blue darken-1" flat @click="close()">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="saveEmployee()">Сохранить</v-btn>
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
                    { text: '#', value: 'settings' },
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
                id:null,
                lastname:'',
                email:'',
                phone:'',
                patronymic:'',
                firstname:'',
                position:null,
            }
        },
        methods:{
            close(){
                this.dialog = false;
                this.id=null;
                this.email = '';
                this.phone = '';
                this.lastname = '';
                this.patronymic ='';
                this.firstname = '';
                this.position = null;
            },
            show(){
              this.dialog=true;
              this.method = 'post'
            },
            getPositions(){
                return this.$http.get(`${Vue.HOST}/positions/${Vue.ORGID}`)
            },
            getEmployees(){
                return this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`)
            },
            changeEmployee(employee){
                console.log(employee);

                this.dialog = true;
                this.id = employee.id;
                this.email = employee.email;
                this.phone = employee.phone;
                this.lastname = employee.lastname;
                this.patronymic = employee.patronymic;
                this.firstname = employee.firstname;
                this.position = employee.position_id;
                this.method = 'put';
            },
            deleteEmployee(id){
                this.$http.delete(`${Vue.HOST}/employees/${Vue.ORGID}/${id}`)
                    .then(()=>{
                        this.dialog=false;
                        return this.getEmployees();
                    })
                    .then(response=>{
                        this.employees = response.data;
                    })
                    .catch(err=>console.log(err));
            },
            saveEmployee(){
                let {firstname, lastname, patronymic, phone, position, email, id} = this;

                this.$http[this.method](`${Vue.HOST}/employees/${Vue.ORGID}`, {firstname, lastname, patronymic, phone, position, email, position, id})
                    .then(()=>{
                        this.close();
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