<template>
    <div>
        <v-card>
            <div class="px-3 pt-3">
                <v-btn small color="success" @click="show()">Добавить</v-btn>
            </div>
            <v-data-table
                    :headers="headers"
                    :items="positions"
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-btn flat icon color="pink" @click="deletePosition(props.item.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn flat icon color="pink" @click="changePosition(props.item)">
                            <v-icon>create</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.comment }}</td>
                </template>
            </v-data-table>
        </v-card>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Добавить должность</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Название*" v-model="name" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            v-model="comment"
                                            label="Комментарий"
                                            hint="Hint text"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*Поля обязательны</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close()">Закрыть</v-btn>
                        <v-btn color="blue darken-1" flat @click="save()">Сохранить</v-btn>
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
                    { text: '#', value: 'items' },
                    {
                        text: 'Должность',
                        align: 'left',
                        value: 'position'
                    },
                    { text: 'Комментарий', value: 'comment' },
                ],
                id:null,
                name: null,
                comment:null,
                positions:[]
            }
        },
        methods:{
            show(){
                this.menthod='post';
                this.dialog=true;
            },
            close(){
                this.dialog=false;
                this.name=null;
                this.comment=null;
            },
            save(){
                let {name, comment, id} = this;
                console.log(this);
                this.$http[this.menthod](`${Vue.HOST}/positions/${Vue.ORGID}`, {name, comment, id})
                    .then(()=>{
                        this.getPositions()
                            .then(response=>{
                                this.positions = response.data;
                            })
                            .catch(err=>console.log(err))
                        this.dialog=false;
                        this.name = null;
                        this.comment = null;
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            changePosition(position){
                this.dialog = true;
                this.name = position.name;
                this.comment = position.comment;
                this.id = position.id;
                this.menthod='put';
            },
            getPositions(){
                return this.$http.get(`${Vue.HOST}/positions/${Vue.ORGID}`);
            },
            deletePosition(id){
                this.$http.delete(`${Vue.HOST}/positions/${Vue.ORGID}/${id}`)
                    .then(()=>{
                        this.getPositions()
                            .then(response=>{
                                this.positions = response.data;
                            })
                            .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err));
            }
        },
        mounted(){
            this.getPositions()
                .then(response=>{
                    this.positions = response.data;
                    this.dialog = false;
                })
                .catch(err=>console.log(err))
        }
    }
</script>

<style scoped>

</style>