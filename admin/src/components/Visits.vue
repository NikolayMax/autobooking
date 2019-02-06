<template>
    <div>
        <v-card>
            <v-data-table
                    :headers="headers"
                    :items="visits">
                <template slot="items" slot-scope="props">
                    <td>№{{ props.item.id }}</td>
                    <td>{{ props.item.date | date('MM/DD/YYYY')}} </td>
                </template>
            </v-data-table>
        </v-card>
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
                visits:[]
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