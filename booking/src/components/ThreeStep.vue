<template>
    <v-form v-model="valid">
        <div class="title pb-2 mt-5">Личные данные</div>
        <v-text-field
                v-model="firstname"
                label="Имя"
                required
        ></v-text-field>
        <v-text-field
                v-model="lastname"
                label="Фамилия"
                required
        ></v-text-field>
        <v-text-field
                v-model="patronymic"
                label="Отчество"
                required
        ></v-text-field>
        <v-text-field
                v-model="phone"
                label="Телефон"
                mask="(###) ### - ####"
                required
        ></v-text-field>
    </v-form>
</template>

<script>
    import {SET_PHONE,SET_PATRONYMIC,SET_FIRSTNAME,SET_LASTNAME} from '../store/actions/user';

    export default {
        name: "ThreeStep",
        data: () => ({
            valid: false,
        }),
        computed: {
            firstname: {
                get() {
                    return this.$store.state.firstname
                },
                set(newValue) {
                    return this.$store.dispatch(SET_FIRSTNAME, newValue)
                }
            },
            lastname: {
                get() {
                    return this.$store.state.lastname
                },
                set(newValue) {
                    return this.$store.dispatch(SET_LASTNAME, newValue)
                }
            },
            patronymic: {
                get() {
                    return this.$store.state.patronymic
                },
                set(newValue) {
                    return this.$store.dispatch(SET_PATRONYMIC, newValue)
                }
            },
            phone: {
                get() {
                    return this.$store.state.phone
                },
                set(newValue) {
                    return this.$store.dispatch(SET_PHONE, newValue)
                }
            },
        }
    }
</script>

<style scoped>

</style>