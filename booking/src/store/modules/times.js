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
        [TIMES_UPDATE]: ({commit, state}, {date, employee}) => {

            let durationServices=0;
            store.state.selected.services.forEach(service=>{
                service.minutesDuration = timeCalculated.stringToMinutes(service.duration);
                durationServices+=service.minutesDuration;
            });
            Vue.http.get(`${Vue.HOST}/visit/${Vue.ORGID}`, {params:{date, employee}})
                .then(response=>{
                    let visits = response.data.filter(visit=>visit.visitItems.length);
                    let visitItems = [];
                    visits.forEach(visit=>{
                        visitItems = visitItems.concat(visit.visitItems);
                    });
                    function f(s){
                        let arr = s.split(':');


                        if(arr[1] < 15){
                            arr[1] = "00";
                        }else if(arr[1] >= 15 && arr[1] <= 30){
                            arr[1] = "30";
                        }else if(arr[1] < 45){
                            arr[1] = "30";
                        }else if(arr[1] >= 45){
                            arr[0] = arr[0] * 1 + 1 < 10 ? "0" + (arr[0] * 1 + 1) : (arr[0] * 1 + 1) + "";
                            arr[1] = "00";
                        }
                        return arr.join(":");
                    }
                    visitItems.forEach(vItem=>{
                        vItem.mStartTime = timeCalculated.stringToMinutes(f(vItem.startTime));
                        vItem.mEndTime = timeCalculated.stringToMinutes(f(vItem.endTime));
                        vItem.mDuration = timeCalculated.stringToMinutes(vItem.duration);

                        state.forEach(time=>{
                            if(time.minutes >= vItem.mStartTime && time.minutes < vItem.mEndTime){
                                time.disabled=true;
                            }
                        });
                    });

                    let r = store.state.selected.services.reduce((ac, v)=>{
                        return ac + v.minutesDuration;
                    },0);
                    if(r < 30 && r !== 0)
                        r = 30;
                    console.log(store.state.selected.services, r);
                    let arrActiveTimes = [];
                    arrActiveTimes.count = 0;
                    state.forEach(time=>{
                        if(!time.disabled){
                            arrActiveTimes.push(time);
                            arrActiveTimes.count += 30;
                        }else if(arrActiveTimes.length){
                            if(r > arrActiveTimes.count){
                                arrActiveTimes.forEach(el=>{
                                    el.disabled=true;
                                })
                            }
                            arrActiveTimes.length=0;
                            arrActiveTimes.count=0;
                        }
                    });

                });

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