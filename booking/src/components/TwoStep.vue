<template>
    <div>
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <v-date-picker v-model="picker"></v-date-picker>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <v-btn depressed v-for="item in times"
                           :color="item.selected ? 'primary' : ''"
                           :disabled="item.disable"
                           v-on:click="selectedTime.selected=false;selectedTime=item;item.selected=true">{{item.title}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "TwoStep",
        data () {
            return {
                selectedTime:{},
                times:[
                    {
                        title:'11:30',
                        disable:true,
                        selected:false
                    },{
                        title:'12:00',
                        disable:true,
                        selected:false
                    },
                    {
                        title:'12:30',
                        disable:true,
                        selected:false
                    },
                    {
                        title:'13:00',
                        disable:true,
                        selected:false
                    },
                    {
                        title:'13:30',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'14:00',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'14:30',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'15:00',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'15:30',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'16:00',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'16:30',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'17:00',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'17:30',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'18:00',
                        disable:false,
                        selected:false
                    },
                    {
                        title:'18:30',
                        disable:true,
                        selected:false
                    },
                ],
                picker: new Date().toISOString().substr(0, 10),
                landscape: false,
                reactive: false
            }
        }
    }
</script>

<style scoped>

</style>