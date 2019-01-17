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
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.position }}</td>
                    <td>{{ props.item.birthdate }}</td>
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
                                    <v-text-field label="Фамилия" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field label="Имя*" hint="example of helper text only on focus"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                            label="Отчество"
                                            hint="example of persistent helper text"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Телефон*" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Password*" type="password" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            :items="['Директор', 'Матер', 'Автомеханик', 'Ремон']"
                                            label="Должность"
                                            required
                                    ></v-select>
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
            }
        },
        mounted(){
            this.$http.get(`${Vue.HOST}/employees/${Vue.ORGID}`)
                .then(services=>console.log(services))
                .catch(err=>{})
        }
    }
</script>

<style scoped>

</style>