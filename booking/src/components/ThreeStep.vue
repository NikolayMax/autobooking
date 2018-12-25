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
                required
        ></v-text-field>
    </v-form>
</template>

<script>
    export default {
        name: "ThreeStep",
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            patronymic: '',
            phone: '',

        })
    }
</script>

<style scoped>

</style>