import Vue from 'vue';

export default {
    state:{},
    getters:{

    },
    actions:{
        getServices: ({commit}, {car, model}) => {
            return Vue.http.get(`${Vue.HOST}/services/${Vue.ORGID}`, {params:{car, model}})
                .then(response=>Promise.resolve(response.data))
        }
    },
    mutations:{

    }
}