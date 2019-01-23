<script>
    import Vue from 'vue';

    export default{
        name:'OneStep',
        methods:{
            getService: function(){
                this.$http.get(`${Vue.HOST}/services/${Vue.ORGID}`)
                    .then(response=>{
                        this.items = response.data;
                        console.log(response.data)
                    })
                    .catch(error=>console.log(error));
            }
        },
        mounted: function () {
            this.getService();
        },
        data: () => ({
            marks:[
                {
                    id:1,
                    name:'Audi'
                },
                {
                    id:2,
                    name:'Skoda'
                },
                {
                    id:3,
                    name:'Lada'
                },
            ],
            models:[
                {
                    id:1,
                    name:'model 1'
                },
                {
                    id:2,
                    name:'model 2'
                },
                {
                    id:3,
                    name:'model 3'
                },
            ],
            items: [],
            value: [],
            mark:[],
            model:[],
            headers: [
                {
                    text: 'Название',
                    value: 'name'
                },
                { text: 'Цена', value: 'price',align:'right' }
            ],
        })
    }
</script>
<template>
    <div class="one-step">
        <v-select
                xs12 sm12
                v-model="mark"
                :items="marks"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите марку">
        </v-select>
        <v-select
                xs12 sm12
                v-model="model"
                :items="models"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите модель">
        </v-select>
        <v-select
                xs12 sm12
                v-model="value"
                :items="items"
                item-text="name"
                item-value="id"
                return-object
                label="Выберите услугу"
                multiple>
            <template
                    slot="selection"
                    slot-scope="{ item, index }">
            <span
                    v-if="index === 0"
                    class="grey--text caption"
            > + ({{ value.length }} Выбрано)</span>
            </template>
            <template slot="item" slot-scope="data">
                <v-flex>
                    {{ data.item.name }}
                    <span style="float:right;">{{ data.item.price }} р.</span>
                </v-flex>
            </template>
        </v-select>
        <div class="title pb-4 pt-5" >Выбранные услуги</div>
        <v-data-table
                :headers="headers"
                :items="value"
                class="elevation-2"
                hide-actions
                no-data-text
                hide-headers>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.price }} р.</td>
            </template>
            <template slot="footer">
                <td>
                    <strong>Сумма</strong>
                </td>
                <td class="text-xs-right">
                    <strong>{{value.reduce((a1,a2)=>a1+a2.price, 0)}} р.</strong>
                </td>
            </template>
        </v-data-table>
    </div>
</template>