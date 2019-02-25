import timeCalculated from '@/services/vue.time-calculated';
import { TIMES_RESET, TIMES_UPDATE } from "@/store/actions/times";
import store from '@/store';
import Vue from 'vue';

export default {
    state:'08:00,08:30,09:00,09:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30,23:00,23:30,00:00'
            .split(',')
            .map(time=>({selected:false,disabled:false,title:time, minutes:timeCalculated.stringToMinutes(time)})),
    actions:{
        [TIMES_RESET]: ({commit, state}) => {
            commit(TIMES_RESET);
            return state
        },
        [TIMES_UPDATE]: ({commit, state}, date) => {

            let durationServices=0;
            store.state.selected.services.forEach(service=>{
                service.minutesDuration = timeCalculated.stringToMinutes(service.duration);
                durationServices+=service.minutesDuration;
            });

            Vue.http.get(`${Vue.HOST}/booking/timeIntervals/${Vue.ORGID}/${date}`)
                .then(response=>{
                    let timeIntervals = response.data.map(item=>{
                        return {...item, minuteStartTime:timeCalculated.stringToMinutes(item.startTime), minuteEndTime:timeCalculated.stringToMinutes(item.endTime)}
                    });

                    state.forEach(time=>{
                        timeIntervals.forEach(interval=>{
                            if(time.minutes >= interval.minuteStartTime && time.minutes <= interval.minuteEndTime && date === interval.date){
                                time.disabled=true;
                            }
                        })
                    });
                    let times = [];
                    times.duration=0;
                    state.forEach(time=>{
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

            return state
        },
    },
    mutations:{
        [TIMES_RESET]: (state) => {
            state.forEach(time=>{
                time.selected=false;
                time.disabled=false;
            });
        },
    }
}