<template>
       <v-container>
           <v-layout>
               <v-flex sm4 offset-sm4>
                    <v-card>
                        <v-card-title class="display-1 font-weight-thin">Авторизация</v-card-title>
                        <v-alert
                                v-show="error"
                                :value="true"
                                type="warning">
                            {{error}}
                        </v-alert>
                        <v-card-text>
                            <v-layout row>
                                <v-text-field
                                    label="Телефон"
                                    v-model="phone"
                                    :error-messages="checkError('phone')"
                                    ></v-text-field>
                            </v-layout>
                            <v-layout row>
                                <v-text-field
                                        label="Пароль"
                                        v-model="password"
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                        :rules="[rules.required, rules.min]"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        hint="At least 3 characters"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-layout>
                            <v-layout row>
                                <v-flex>
                                    <v-btn @click="login">OK</v-btn>
                                    <v-btn @click="register" color="blue-grey"
                                           class="white--text">
                                        <v-icon dark left>edit</v-icon>
                                        Регистрация
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
               </v-flex>
           </v-layout>
       </v-container>
</template>

<script>

    import {AUTH_REQUEST} from '../store/actions/auth'

    export default{
        mounted() {
            console.log(123);
            this.$http.get('http://localhost:3000/user/isAuth')
                .then((res)=>{
                    console.log(res)

                });
        },
        data:()=>({
            phone:'',
            password:'',
            error:null,
            show1: false,
            show2: true,
            show3: false,
            show4: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 3 || 'Min 3 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            },
            checkError:function() {

            },
        }),
        methods:{
            register: function(){
              this.$router.push('/register')
            },
            login: function () {
                const { phone, password } = this;

                this.$store.dispatch(AUTH_REQUEST, { phone, password })
                    .then(()=>{
                        this.$router.push('/')
                    })
                    .catch(err=>{
                        if(err){
                            this.error = err.text;
                            setTimeout(()=>{this.error=null}, 5000)
                        }
                    })
            }
        }
    }
</script>