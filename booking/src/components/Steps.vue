
<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Выбрать услугу</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Время и дата</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Личные данные</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="mb-5 minHeight" flat>
                    <OneStep></OneStep>
                </v-card>
                <v-btn color="primary"
                       @click="e1 = 2">
                    Далее
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card class="mb-5 minHeight" flat>
                    <TwoStep></TwoStep>
                </v-card>
                <v-btn color="primary"
                       @click="e1 = 1">
                    Назад
                </v-btn>
                <v-btn color="primary"
                       @click="e1 = 3">
                    Далее
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card class="mb-5 minHeight" flat>
                    <ThreeStep></ThreeStep>
                </v-card>

                <v-btn color="primary"
                       @click="e1 = 2">
                    Назад
                </v-btn>
                <v-btn color="primary" @click="signUp()">
                    Записаться
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
                <v-card class="mb-5 minHeight" flat>
                    <FourStep></FourStep>
                </v-card>
                <v-btn color="primary"
                       @click="e1 = 1">
                    Перейти к выбору услуг
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<script>
    import OneStep from './OneStep';
    import TwoStep from './TwoStep';
    import ThreeStep from './ThreeStep';
    import FourStep from './FourStep';
    import {SELECTED_CLEAR} from '@/store/actions/selected';
    import { TIMES_RESET, TIMES_UPDATE } from "@/store/actions/times";
    import Vue from 'vue';

    export default {
        components: {
            OneStep,
            TwoStep,
            ThreeStep,
            FourStep
        },
        methods:{
            signUp(){
                let {user} = this.$store.state;
                let {services, car, model, date, time} = this.$store.state.selected;

                this.$http.post(`${Vue.HOST}/visit/1`, {
                    user,
                    services,
                    car,
                    model,
                    date,
                    time:time.title
                })
                    .then(response=>{
                        this.e1=4;
                        this.$store.dispatch(SELECTED_CLEAR);
                        this.$store.dispatch(TIMES_RESET);
                        this.$store.dispatch(TIMES_UPDATE, this.$store.state.selected.date);
                    })
                    .catch(err=>{
                        this.$store.dispatch(SELECTED_CLEAR);
                    })
            }
        },
        data () {
            return {
                e1: 1
            }
        }
    }
</script>

<style scoped>
.minHeight{
    min-height: 440px;
}
</style>