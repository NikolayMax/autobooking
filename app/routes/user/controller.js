class UserController{
    constructor(db){
        this.db = db;
    }
    login(req, res, next){
        let {phone, password} = req.body;
        if(phone == 'root' && password == 123){
            res.json({token:'eeriugenriugeuring'})
        }else{
            res.status(401).json({message:'не верный пароль или логин'})
        }

    }
}
module.exports = UserController;