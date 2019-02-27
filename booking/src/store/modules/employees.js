import Vue from 'vue';

export default {
    state:{},
    getters:{

    },
    actions:{
        getEmployees: () => Vue.http.get(`${Vue.HOST}/employees/${Vue.ORGID}`).then(response=>Promise.resolve(response.data))
    },
    mutations:{

    }
}