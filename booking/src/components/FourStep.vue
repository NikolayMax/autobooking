<template>
    <div>
        <v-alert
                :value="alert"
                type="success"
                transition="scale-transition">
            Вы успешно записались
        </v-alert>
    </div>
</template>

<script>

    export default {
        name: "FourStep",
        data () {
            return {
                alert:true,
            }
        },
    }
</script>

<style scoped>

</style>