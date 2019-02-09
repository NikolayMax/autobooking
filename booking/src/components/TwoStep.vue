<template>
    <div>
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
    import Vue from 'vue';
    import {SET_DATE,SET_TIME} from '../store/actions/selected';

    export default {
        name: "TwoStep",
        data () {
            return {
                times:[],
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: new Date().toISOString().substr(0, 10),
                timeInterval:[],
                menu1: false,
                landscape: false,
                reactive: false
            }
        },
        methods:{
            stringToMinutes(time){
                let splitTime = time.split(':');

                let hours = splitTime[0]*1;
                let minutes = splitTime[1]*1;

                return (hours*60)+minutes;
            },
            computedTimes(date){
                let durationServices=0;
                this.$store.state.selected.services.forEach(service=>{
                    service.minutesDuration = this.stringToMinutes(service.duration);
                    durationServices+=service.minutesDuration;
                });
                console.log(this.$store.state.selected.services);
                this.times.forEach(time=>{
                    time.disabled=false;
                    time.selected=false;
                });
                this.$http.get(`${Vue.HOST}/booking/timeIntervals/${Vue.ORGID}/${date}`)
                    .then(response=>{
                        this.timeIntervals = response.data.map(item=>{
                            return {...item, minuteStartTime:this.stringToMinutes(item.startTime), minuteEndTime:this.stringToMinutes(item.endTime)}
                        });

                        this.times.forEach(time=>{
                            this.timeIntervals.forEach(interval=>{
                                console.log(date, interval.date);
                                if(time.minutes >= interval.minuteStartTime && time.minutes <= interval.minuteEndTime && date === interval.date){
                                    time.disabled=true;
                                }
                            })
                        });
                        let times = [];
                        times.duration=0;
                        this.times.forEach(time=>{
                            if(!time.disabled){
                                times.push(time);
                                times.duration+=30
                            }else{
                                if(times.duration <= durationServices){
                                    times.forEach(item=>{
                                        item.disabled=true;
                                    });
                                    times.length=0;
                                    times.duration=0;
                                }
                            }
                        });
                    })
            }
        },
        watch:{
            picker:function(value, old){
                this.computedTimes(value);
            }
        },
        mounted:function(){
            this.times = '08:00,08:30,09:00,09:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30,23:00,23:30,00:00'
                        .split(',')
                        .map(time=>({selected:false,disabled:false,title:time, minutes:this.stringToMinutes(time)}));

            this.computedTimes(this.date);
        },
        computed: {
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