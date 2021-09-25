const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 12,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 32,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},{timestamps:true});

// campos virtuais
userSchema.virtual('password').set(function(password){
    // criar temp variável chamada _password

    this._password = password
    // gerar salt
    this.salt = this.makeSalt()
    //criptografar a senha
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})
// métodos de autentcação, criptografia de senha, makeSalt
userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;

    },


    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        }catch(err){
            return ''
        }
    },

    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.round()) + '';
    }
};

// export user model

module.exports= mongoose.model('User', userSchema);
