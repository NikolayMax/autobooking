<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="dialog=true">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="cars"
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Добавить автомобиль</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Нзвание" required v-model="name"></v-text-field>
                                </v-flex>
                                <v-layout row v-for="(mark, index) in marks" :key="index">
                                    <v-flex xs10>
                                        <v-text-field label="Нзвание марки*" v-model="mark.name"></v-text-field>
                                    </v-flex>
                                    <v-flex p>
                                        <v-btn flat color="blue darken-1" @click="deleteMark(mark, index)">
                                            Удалить
                                        </v-btn>
                                    </v-flex>
                                </v-layout>

                                <v-flex xs12>
                                    <v-btn color="blue darken-1" flat @click="addMark()">Добавить марку</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*Поля обязательны</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="saveCar()">Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Cars",
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
                ],
                cars: [],
                marks:[{name:null}],
                name:null
            }
        },
        methods:{
            deleteMark(mark, index){
                delete this.marks.splice(index, 1);
            },
            addMark(){
                  this.marks.push({name:null});
            },
            getCars(){
                return this.$http.get(`${Vue.HOST}/cars/${Vue.ORGID}`)
            },
            saveCar(){
                let {name, marks} = this;
                marks = marks.map(item=>item['name']);

                this.$http.post(`${Vue.HOST}/cars/${Vue.ORGID}`, {name, marks})
                    .then(res=>{
                        console.log(res);
                        this.dialog=false;
                        return this.getCars()
                    })
                    .then(response=>this.cars = response.data)
                    .catch(err=>console.log(err))
            }
        },
        mounted(){
            this.getCars()
                .then(response=>{
                    this.cars = response.data;
                })
                .catch(err=>console.log(err))
        }
    }
</script>

<style scoped>

</style>