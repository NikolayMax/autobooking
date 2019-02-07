<template>
  <v-app>
      <div v-show="isAuth">
          <LeftMenu></LeftMenu>
          <ToolBar/>
          <v-content>
              <v-container>
                  <router-view></router-view>
              </v-container>
          </v-content>
          <v-footer app></v-footer>
      </div>
      <div @click="isAuth2()">sdkjfnsjdkfnk</div>
      <router-view  v-show="!isAuth"></router-view>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
import LeftMenu from './components/LeftMenu'
import {AUTH_LOGOUT} from './store/actions/auth';

export default {
    name: 'App',
    components: {
        ToolBar,
        LeftMenu
    },
    computed:{
        isAuth:function(){
            return this.$store.getters.isAuthenticated
        }
    },
    data () {
        return {
        //
        }
    },
    methods:{
      isAuth2(){
          this.$http.get('http://localhost:3000/user/isAuth')
              .then((res)=>{
                  if(res.data === false)
                      this.$store.dispatch(AUTH_LOGOUT)
              });
      }
    },
    mounted:function(){
        this.isAuth2();
    }
}
</script>
