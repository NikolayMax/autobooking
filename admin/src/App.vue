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
      <router-view  v-hide="isAuth"></router-view>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
import LeftMenu from './components/LeftMenu'

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
    }
}
</script>
