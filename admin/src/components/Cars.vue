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
                    <td>
                        <v-btn flat icon color="pink" @click="deleteCar(props.item.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="changeCar(props.item)">
                            <v-icon>create</v-icon>
                        </v-btn>
                    </td>
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
                        <v-btn color="blue darken-1" flat @click="close()">Закрыть</v-btn>
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
                    { text: '#', value: 'items' },
                    {
                        text: 'Название',
                        align: 'left',
                        value: 'name'
                    },
                ],
                id:null,
                cars: [],
                marks:[{name:null}],
                name:null
            }
        },
        methods:{
            show(){
                this.dialog = true;
                this.menthod='post';
            },
            close(){
                this.dialog = false;
                this.name = null;
                this.marks = [{name:null}];
            },
            changeCar(car){
                this.dialog=true;
                this.name = car.name;
                this.marks = car.marks;
                this.id = car.id;
                this.menthod='put';
            },
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
                let {name, marks, id} = this;
                marks = marks.map(item=>item['name']);

                this.$http[this.menthod](`${Vue.HOST}/cars/${Vue.ORGID}`, {name, marks, id})
                    .then(res=>{
                        console.log(res);
                        this.dialog=false;
                        return this.getCars()
                    })
                    .then(response=>this.cars = response.data)
                    .catch(err=>console.log(err))
            },
            deleteCar(id){
                this.$http.delete(`${Vue.HOST}/cars/${Vue.ORGID}/${id}`)
                    .then(()=>{
                        this.getCars()
                            .then(response=>{
                                this.cars = response.data;
                            })
                            .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err));
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