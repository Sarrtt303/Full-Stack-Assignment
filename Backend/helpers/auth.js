const bcrypt= require("bcrypt");

const hashPassword=(password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, (err,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password, salt, (err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

const comparePassword =(password, hashed)=>{     //Compares the hashed password in the database with the password entered by the user
    return bcrypt.compare(password, hashed)
}

module.exports={
    hashPassword,
    comparePasswords
}