<template>
    <v-container>
        <div class="title mb-3">Ваша Онлайн Запись доступна по ссылке:</div>
        <v-flex>
            <v-text-field
                    v-model="link"
                    label="Solo"
                    single-line
                    solo
            ></v-text-field>
        </v-flex>
        <v-btn color="info" @click="show()">Открыть ссылку</v-btn>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    export default {
        name: "Booking",
        data () {
            return {
                dialog:false,
            }
        },
        methods:{
            show(){
                window.open(this.link);
            }
        },
        computed:{
            link:{
                get(){
                    return `${Vue.HOST}/bookign/bookign?orgid=${Vue.ORGID}`;
                }
            }
        }
    }
</script>

<style scoped>

</style>