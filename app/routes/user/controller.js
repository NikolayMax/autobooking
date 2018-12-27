const passport = require('passport');
class UserController{
    constructor(db){
        this.db = db;
    }
    login(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            return err
                    ? next(err)
                    : user
                        ? req.logIn(user, function(err) {
                            return err
                                ? next(err)
                                : res.redirect('/user');
                        })
                        : res.json({1:user});})(req, res, next);
    }
    register(req, res, next){
        let {lastname, firstname, patronymic, password, comfirmPassword, phone, nameAutoservice} = req.body;
        phone = phone.replace(/[^0-9]/g,'');

        this.db.query('SELECT * FROM auto_admin.users WHERE phone = ? AND password = ?', [phone, password])
            .then((users)=>{
                let user = users[0];
                return new Promise((res, rej)=>{
                    if(user){
                        rej('Такой пользователь существует если это вы авторизуйтесь')
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
            .then((user)=>new Promise((res, rej)=>{
                this.db.query('INSERT INTO auto_admin.users(lastname, firstname, patronymic, password, phone, organization_id) VALUES(?, ?, ?, ?, ?, ?)',
                    [lastname, firstname, patronymic, password, phone, user['organization_id']])
                    .then((users)=>res(users))
                    .catch((err)=>rej(err))
            }))
            .then(()=> this.db.query('SELECT * FROM auto_admin.users WHERE password = ? AND phone = ?', [password, phone]))
            .then(function(users){
                let user = users[0];
                req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.json(user);
                })
            })
            .catch((err)=>{
                console.log(53, err)
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