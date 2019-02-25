<template>
    <div v-on:reset-times="resetTimes()">
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex xs12 lg6>
                    <v-menu ref="menu1"
                            :close-on-content-click="false"
                            v-model="menu1"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            full-width>
                        <v-text-field
                                slot="activator"
                                v-model="picker"
                                label="Date"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                prepend-icon="event"
                        ></v-text-field>
                        <v-date-picker v-model="picker" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                    <v-btn depressed
                           v-for="item in times"
                           :key="item.id"
                           :color="item.selected ? 'primary' : ''"
                           :disabled="item.disabled"
                           v-on:click="selectedTime.selected=false;selectedTime=item;item.selected=true">{{item.title}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {SET_DATE,SET_TIME} from '../store/actions/selected';
    import {TIMES_RESET, TIMES_UPDATE} from "@/store/actions/times";

    export default {
        name: "TwoStep",
        data () {
            return {
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: new Date().toISOString().substr(0, 10),
                timeInterval:[],
                menu1: false,
                landscape: false,
                reactive: false
            }
        },
        methods:{
        },
        watch:{
            picker:function(value, old){
                this.$store.dispatch(TIMES_RESET);
                this.$store.dispatch(TIMES_UPDATE, value);
            }
        },
        mounted:function(){
            this.$store.dispatch(TIMES_UPDATE, this.date);
        },
        computed: {
            times: {
                get() {
                    return this.$store.state.times
                },
                set(value) {
                    console.log(value)
                }
            },
            picker: {
                get() {
                    return this.$store.state.selected.date
                },
                set(newValue) {
                    return this.$store.dispatch(SET_DATE, newValue)
                }
            },
            selectedTime: {
                get() {
                    return this.$store.state.selected.time
                },
                set(newValue) {
                    return this.$store.dispatch(SET_TIME, newValue)
                }
            },
        }
    }
</script>

<style scoped>

</style>