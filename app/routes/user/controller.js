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
                        : res.redirect('/login');})(req, res, next);
    }
    register(req, res, next){
        let {phone, password} = req.body;
        this.db.query('INSERT INTO auto_admin.users(phone, password) VALUES(?, ?)', [phone, password])
            .then(()=> this.db.query('SELECT * FROM auto_admin.users WHERE phone = ? AND password = ?', [phone, password]))
            .then(function(users){
                let user = users[0];
                req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.redirect('/user');
                })
            })
            .catch((err)=>next(err));
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