const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const AuthMiddleware = {};

AuthMiddleware.isAuthentication = function(req, res, next){
    if(!req.session.user){
        return res.redirect('/');
    }
    else{
        if(!user){
            return res.redirect('/');
        }
        else{
            bcrypt.compare(data.userId, user._id.toString(), function(err,result){
                if(result = true){
                    return next();
                }
                else{
                    return next(err);
                }
            })
        }
    }
}