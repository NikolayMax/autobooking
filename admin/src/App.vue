<template>
  <v-app>
      <div v-show="isAuth()">
          <LeftMenu></LeftMenu>
          <ToolBar/>
          <v-content>
              <v-container>
                  <router-view></router-view>
              </v-container>
          </v-content>
          <v-footer app></v-footer>
      </div>
      <router-view v-show="!isAuth()"></router-view>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
import LeftMenu from './components/LeftMenu'
import {USER_IS_LOGIN} from './store/actions/user';

export default {
    name: 'App',
    components: {
        ToolBar,
        LeftMenu
    },
    methods:{
        isAuth(){
            return this.$store.getters.isAuthenticated()
        }
    },
    data () {
        return {
        //
        }
    },
    mounted:function(){
        this.$store.dispatch(USER_IS_LOGIN);
    }
}
</script>
