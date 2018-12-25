<template>
    <v-toolbar dark color="primary" app v-show="isAuth">
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">Autobooking</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        computed:{
            isAuth:function(){
                return this.$store.getters.isAuthenticated
            }
        },
        data: () => ({
            ecosystem: [
                {
                    text: 'vuetify-loader',
                    href: 'https://github.com/vuetifyjs/vuetify-loader'
                },
                {
                    text: 'github',
                    href: 'https://github.com/vuetifyjs/vuetify'
                },
                {
                    text: 'awesome-vuetify',
                    href: 'https://github.com/vuetifyjs/awesome-vuetify'
                }
            ],
            importantLinks: [
                {
                    text: 'Documentation',
                    href: 'https://vuetifyjs.com'
                },
                {
                    text: 'Chat',
                    href: 'https://community.vuetifyjs.com'
                },
                {
                    text: 'Made with Vuetify',
                    href: 'https://madewithvuetifyjs.com'
                },
                {
                    text: 'Twitter',
                    href: 'https://twitter.com/vuetifyjs'
                },
                {
                    text: 'Articles',
                    href: 'https://medium.com/vuetify'
                }
            ],
            whatsNext: [
                {
                    text: 'Explore components',
                    href: 'https://vuetifyjs.com/components/api-explorer'
                },
                {
                    text: 'Select a layout',
                    href: 'https://vuetifyjs.com/layout/pre-defined'
                },
                {
                    text: 'Frequently Asked Questions',
                    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
                }

            ]
        })
    }
</script>

<style>

</style>
