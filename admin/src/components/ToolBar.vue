<template>
    <v-toolbar dark color="primary" app>
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn outline
               class="white--text"
               @click="exit()">
            Выйти
            <v-icon right dark>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    import {USER_LOGOUT} from '../store/actions/user';

    export default {
        computed:{
            isAuth:function(){
                return this.$store.getters.isAuthenticated()
            },
            title:{
                get() {
                    return this.$route.meta.title
                }
            }
        },
        methods:{
            exit(){
                this.$cookie.delete('connect.sid');
                this.$router.push('/login');
                this.$store.dispatch(USER_LOGOUT);
            }
        },
        data: () => ({

        })
    }
</script>

<style>

</style>
