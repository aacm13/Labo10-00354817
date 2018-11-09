const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const {Schema} = mongoose;
const UserSchema = new Schema({
    email:{type:String, require:true, unique:true},
    password:{type:String, required:true}
});

UserSchema.statics.authenticate = function(email, password, callback)
{
    User.findOne({email:email})
    .exec(function(err,user){
        if(err)
        {
            return callback(err);
        }
        else if(!user)
        {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bycrypt.compare(password,user.password, function(err,result){
            if(result==true)
            {
                return callback(null, user);
            }else{
                return callback(new Error('User or password wrong'));
            }
        })
    })
    
}

UserSchema.pre('save', function(next){
    var user = this;
    bycrypt.hash(user.password,10, function(err, hash){
        if(err)
        {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

let User = mongoose.mondel('users', UserSchema);
module.exports = User;