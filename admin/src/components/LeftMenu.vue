<template>
    <v-navigation-drawer
            :mini-variant.sync="mini"
            v-model="drawer"
            v-show="isAuth"
            stateless
            dark
            app>
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{user.firstname}} {{user.lastname}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
                    v-for="item in items"
                    v-on:click="toRoute(item.route)"
                    :key="item.title">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    export default{
        data:()=>({
            drawer: true,
            items: [
                { title: 'Визиты', icon: 'event', route:'/visits'},
                { title: 'Сотрудники', icon: 'people', route:'/employees' },
                { title: 'Услуги', icon: 'apps', route:'/services'},
                { title: 'Должность', icon: 'star', route:'/positions'},
                { title: 'Автомобили', icon: 'local_car_wash', route:'/cars'},
                { title: 'Онлайн Запись 2.0', icon: 'event_available', route:'/booking'},
            ],
            mini: false,
            right: null
        }),
        methods:{
            toRoute(route){
                this.$router.push(route);
            }
        },
        computed:{
            user:function(){
                return this.$store.getters.user
            },
            isAuth:function(){
                return this.$store.getters.isAuthenticated
            }
        }
    }
</script>