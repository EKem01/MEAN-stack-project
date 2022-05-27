const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//Email validation
let emailLengthChecker = (email) => {
    if (!email){
        return false;
    }else{
        if (email.length < 5 || email.length > 30){
            return false;
        }else{
            return true;
        }
    }
};


let validEmailChecker = (email) => {
    if (!email){
        return false;
    }else{
        const regExp = new 
        RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};


const emailValidators = [{
        validator: emailLengthChecker, 
        message: 'Email must be at least 5 character but not more than 30 '
    },
    {
        validator: validEmailChecker, 
        message: 'Must be a valid email address'
    }
];



//Username validation
let usernameLengthChecker = (username) => {
    if (!username){
        return false;
    }else{
        if (username.length < 3 || username.length > 15){
            return false;
        }else{
            return true;
        }
    }
};

let validUsername = (username) => {
    if (!username){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [{
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 character but not more than 15'

}, { validator: validUsername,
    message: 'Username must not have special characters'
}];

//password validation
let passwordLengthChecker = (password) => {
    if (!password){
        return false;
    }else{
        if (password.length < 8 || password.length > 20){
            return false;
        }else{
            return true;
        }
    }
};

let validPassword = (password) => {
    if (!password){
        return false;
    }else{
        const regExp = new 
        RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?].{8,20}$/);
        return regExp.test(password);
    }
};

const passwordValidators = [{
    validator: passwordLengthChecker,
    message: 'Password must have minimum of 8 characters but not more than 20'

}, { validator: validPassword,
    message: 'Password must have at least one uppercase, lowercase, special charcter and number'
}];



const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
    password: {type: String, required: true, validate: passwordValidators}
});


//password encrypt middleware
userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
    return next();


    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

//password encrypt middleware
userSchema.method.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);