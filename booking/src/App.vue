<template>
    <v-app light>
        <div class="wrapper">
            <Steps></Steps>
        </div>
    </v-app>
</template>

<script>
import Steps from './components/Steps';

export default {
  name: 'App',
  components: {
      Steps
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>
    body{
        font-family: 'Roboto', sans-serif;
    }
    .wrapper{
        max-width:650px;
        width:100%;
        margin:auto;
    }
</style>