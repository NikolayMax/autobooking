import Vue from 'vue';

export default {
    state:{},
    getters:{

    },
    actions:{
        getEmployees: () => Vue.http.get(`${Vue.HOST}/employees/${Vue.ORGID}`).then(response=>{
            response.data.push({id:0, firstname:'Любой мастер'});
            return Promise.resolve(response.data)
        })
    },
    mutations:{

    }
}