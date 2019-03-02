import Vue from 'vue';

export default {
    state:{},
    getters:{

    },
    actions:{
        getServices: ({commit}) => {
            return Vue.http.get(`${Vue.HOST}/services/${Vue.ORGID}`)
                .then(response => Promise.resolve(response.data.filter(service=>{
                    service.employees.forEach(employee=>{
                        employee.selected=false;
                    });
                    return service.employees.length && service.cars.length
                })))
        }
    },
    mutations:{

    }
}