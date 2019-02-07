const passport = require('passport');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

class UserController{
    constructor(db){
        this.db = db;
    }
    isAuth(req, res, next){
        res.json(req.session);
    }
    login(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            console.log(err, user, info)
            if(err)
                return next(err);
            else if(user){
                return req.logIn(user, function(err){
                    return err
                        ? next(err)
                        : res.json(req.session);
                })
            }else{
                return next('Не известная ошибка')
            }
        })(req, res, next);
    }
    register(req, res, next){
        let {lastname, firstname, patronymic, password, comfirmPassword, phone, nameAutoservice} = req.body;
        phone = phone.replace(/[^0-9]/g,'');
        let user, hashPassword;

        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then( hPassword => {
                hashPassword = hPassword;
                return this.db.query('SELECT * FROM auto_admin.users WHERE phone = ?', [phone])
            })
            .then((users)=>{
                user = users[0];
                return new Promise((res, rej)=>{
                    if(user){
                        rej('Такой пользователь существует если это вы, авторизуйтесь!')
                    }else{
                        user = {};
                        this.db.query('INSERT INTO auto_admin.organizations(name) VALUES(?)', [nameAutoservice])
                            .then((result)=>{
                                user['organization_id'] = result.insertId;
                                res(user)
                            })
                            .catch(err => rej(err));
                    }
                });
            })
            .then(()=>{
                this.db.query('INSERT INTO auto_admin.users(lastname, firstname, patronymic, password, phone, organization_id) VALUES(?, ?, ?, ?, ?, ?)',
                    [lastname, firstname, patronymic, hashPassword, phone, user['organization_id']])
            })
            .then(()=> this.db.query('SELECT * FROM auto_admin.users WHERE password = ? AND phone = ?', [hashPassword, phone]))
            .then(function(users){
                let user = users[0];
                req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.json(user);
                })
            })
            .catch((err)=>{
                return next(err)
            });
    }

    list(req, res, next){
        this.db.query('SELECT * FROM auto_admin.users')
            .then(function(users){
                res.json(users)
            })
            .catch((err)=>next(err))
    }
    logout(req, res, next) {
        req.logout();
        res.redirect('/');
    };
}
module.exports = UserController;