const passport = require('passport');
const bcrypt = require('bcrypt');
const path = require('path');
const BCRYPT_SALT_ROUNDS = 10;
const {exec} = require('child_process');
const BaseController = require('../BaseController');

class UserController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    isAuth(req, res, next){
        res.json(req.user);
    }
    login(req, res, next){
        res.json(req.user);
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
            .then(()=>{

                return this.db.query(`CREATE DATABASE IF NOT EXISTS auto_${user['organization_id']}`)
            })
            .then(results=>{
                exec(`cd ${path.resolve(__dirname+'/../../migration')} && node app.js`, (e, stdout, stderr)=> {
                    if (e instanceof Error) {
                        console.error(e);
                        next(e)
                    }
                    console.log(stdout);
                    res.json(user);
                });
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