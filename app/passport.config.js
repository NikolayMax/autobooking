const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./db');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done){
    db.queryRow('SELECT * from auto_admin.users WHERE id = ?', [user.id])
        .then(function(user){
            done(null, user);
        })
});
passport.use(new LocalStrategy({usernameField: 'phone'},function(phone, password, done){
        phone = phone.replace(/[^0-9]/g,'');
        let user;
        if(!phone)
            return done('Телефон не ввиден или не верный формат');

        if(!password)
            return done('Пароль не ввиден');

        db.queryRow('SELECT * from auto_admin.users WHERE phone = ?', [phone])
            .then(row => {
                user = row;
                if(!user){
                    done('Пользователя не существуте', false);
                }
                return bcrypt.compare(password, user.password);
            })
            .then((res)=>{
                console.log(res, user);
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