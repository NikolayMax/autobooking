<template>
    <v-toolbar dark color="primary" app>
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

    </v-toolbar>
</template>

<script>
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
        data: () => ({

        })
    }
</script>

<style>

</style>
