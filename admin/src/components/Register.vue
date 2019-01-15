<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card style="position: relative;">
                    <v-btn
                            absolute
                            dark
                            fab
                            left
                            style="top:10px;"
                            @click="login"
                            color="pink">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-card-title class="display-1 font-weight-thin pl-5 pr-5" style="text-align: center;display: block;">Регистрация автосервиса</v-card-title>
                    <v-alert
                            v-show="error"
                            :value="true"
                            type="error">
                        {{error}}
                    </v-alert>
                    <v-card-text>
                        <v-layout row>
                            <v-text-field
                                    label="Фамилия"
                                    v-model="lastname"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Имя"
                                    v-model="firstname"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Отчество"
                                    v-model="patronymic"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Телефон"
                                    mask="7(###) ### - ####"
                                    v-model="phone"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Название автосервиса"
                                    v-model="nameAutoservice"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Пароль"
                                    v-model="password"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.min]"
                                    :type="showPassword ? 'text' : 'password'"
                                    name="input-10-1"
                                    counter
                                    @click:append="showPassword = !showPassword"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Повторите пароль"
                                    v-model="comfirmPassword"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.min, rules.confirmPassword]"
                                    :type="showPassword ? 'text' : 'password'"
                                    name="input-10-1"
                                    counter
                                    @click:append="showPassword = !showPassword"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <v-btn v-on:click="register">OK</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {USER_REGISTER} from '../store/actions/user'

    export default{
        data:()=>{
            let data = {
                lastname:'',
                firstname:'',
                patronymic:'',
                nameAutoservice:'',
                password:'',
                comfirmPassword:'',
                phone:'',
                error:null,
                showPassword: false,
                rules: {
                    confirmPassword: v => data.comfirmPassword === data.password || 'Пароли не совподают',
                    min: v => v.length >= 6 || 'Минимально 6 символов',
                },
            }
            return data;
        },
        methods:{
            login: function(){
              this.$router.push('/login')
            },
            register: function(){
                const { lastname, firstname, patronymic, password, comfirmPassword, phone, nameAutoservice } = this;

                console.log(USER_REGISTER);
                this.$store.dispatch(USER_REGISTER, { lastname, firstname, patronymic, password, comfirmPassword, phone, nameAutoservice })
                    .then(()=>{
                        this.$router.push('/login')
                    })
                    .catch(err=>{
                        if(err){
                            this.error=err.text;
                            setTimeout(()=>{this.error=null}, 5000)
                        }
                    })
            }
        }
    }

</script>