<template>
</template>

<script>
    import {USER_REGISTER} from '../store/actions/user'

    export default{
        props:['dialog'],
        data:()=>{
            let data = {
                dialog:false,
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