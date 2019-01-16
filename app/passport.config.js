const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./db');

passport.serializeUser(function(user, done) {
    console.log('Серилизация: ', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Десерилизация: ', id);
    db.query('SELECT * from auto_admin.users WHERE id = ?', [id])
        .then(function(user){
            done(null, user?user:false);
        })
});
passport.use(new LocalStrategy({usernameField: 'phone'},function(phone, password, done){
        phone = phone.replace(/[^0-9]/g,'');
        let user;
        if(!phone)
            return done('Телефон не ввиден или не верный формат');

        if(!password)
            return done('Пароль не ввиден');

        db.query('SELECT * from auto_admin.users WHERE phone = ?', [phone])
            .then(users => {
                user = users[0];
                if(!user){
                    done('Пользователя не существуте', false);
                }
                return bcrypt.compare(password, user.password);
            })
            .then((res)=>{
                if(res) {
                    done(null, user);
                } else {
                    done('Не верный пароль', false);
                }
            })
            .catch(function(){
                done('Не известная ошибка', false);
            });
    }
));
passport.authenticationMiddleware = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
};