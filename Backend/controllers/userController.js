const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/schema')


const errorMessage = (err)=>{
    if(err.message){
        return err.message;
    }else{
        return err;
    }
}

module.exports.register = async (req, res) => {
    try{
        const FIRSTNAME= req.body.firstName;
        const LASTNAME = req.body.lastName;
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;
        const IS_ADMIN = req.body.isAdmin;
        
        console.log("isAdmin RESULT: " + IS_ADMIN)
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(PASSWORD, salt);
        
        const emailExist = await UserModel.find({email: EMAIL})
        // console.log("emailExist: ", emailExist);
        if(emailExist.length !== 0){
            throw new Error("Email Already Exist, Try Again!!")
        }
        
        UserModel.create({firstName: FIRSTNAME, lastName: LASTNAME, email: EMAIL, password: hashPassword, isAdmin: IS_ADMIN});
        
    }catch(err){
        res.status(500).json(errorMessage(err))
        console.log(err);
    }finally{
        res.status(200).json({status: "success", message:"user created successfully"})
    }
    
}

module.exports.login = async (req, res) => {
    
    try {
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;
        const userExist = await UserModel.findOne({email: EMAIL})
        //fire error res if user doesnt exist 300,400=resource info (not found, unauthorized),500= server erros
        if(!userExist){
            return res.status(404).json("User Not Found")
        }
        // console.log({userExist})
        //check for the password 
        if(!bcrypt.compareSync(PASSWORD, userExist.password)){
            return  res.status(400).json("Incorrect Username or Password")
        }
        return  res.status(200).json({ 
            status: "Success",
            message: "user logged in successfully",
            token: jwt.sign({ email: userExist.email, _id: userExist._id, isAdmin: userExist.isAdmin }, process.env.TOKEN_SECRET),   //left side is whats return to the front end, and right side is from the backend
            // token: jwt.sign( {...user}, process.env.TOKEN_SECRET),   //left side is whats return to the front end, and right side is from the backend
            admin: userExist.isAdmin
        });
             
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }   
}

module.exports.createProfile = async (req, res) => {
    try {
        const EMAIL = req.body.email;
        const USER = await  UserModel.findOne({email: EMAIL});
        const newData = {
            firstName: req.body.firstName || USER.firstName,
            lastName: req.body.lastName || USER.lastName,
            address: req.body.address || USER.address,
            city: req.body.city || USER.city,
            state: req.body.state || USER.state,
            zipcode: req.body.zipcode || USER.zipcode,
            
        } 
        await UserModel.findOneAndUpdate(
            {email: EMAIL},
            newData
            )
            const newUser = await  UserModel.findOne({email: EMAIL});
            const profileResponse = {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                profileImage: newUser.profileImage,
                address: newUser.address,
                city: newUser.city,
                state: newUser.state,
                zipcode: newUser.zipcode,
            }
            res.status(200).json({status: "success", profile: profileResponse })
        } catch (err) {
            res.status(500).json(err)
            console.log(err);
        }
    }
    
    module.exports.editProfile = async (req, res) => {
        try {
           console.log("Request Address", req.body.address)
            const USER = await  UserModel.findById(req.body.id);
            console.log("Request User", USER)
            const newData = {
                address: req.body.address || USER.address,
                city: req.body.city || USER.city,
                state: req.body.state || USER.state,
                zipcode: req.body.zipcode || USER.zipcode,
                
            } 
            await UserModel.findByIdAndUpdate(
                req.body.id,
                newData
                )
                
                res.status(200).json({status: "success", message: "profile modified successfully" })
            } catch (err) {
                res.status(500).json(err)
                console.log(err);
            }
        }
        
        module.exports.updateImageProfile = async (req, res) => {
             console.log("updateImageProfile 1: ", req.file)
            //  console.log("updateImageProfile 2: ", req.body.image.filename)
            try{
                const userExist = await UserModel.findOneAndUpdate({_id: req.body.id}, {profileImage: req.file.filename})  //findOne returns an array, find - returns an object
                
            }catch(err){
                res.status(500).json(errorMessage(err))
                console.log(err);
            }finally{
                res.status(200).json({status: "success", message:"image updates"})
            }
        }

        module.exports.deleteImageProfile = async (req, res) => {
            console.log("deleteImageProfile", req.body)
           try{
               const userExist = await UserModel.findOneAndUpdate({_id: req.body.id}, {profileImage: ""})  //findOne returns an array, find - returns an object
               
           }catch(err){
               res.status(500).json(errorMessage(err))
               console.log(err);
           }finally{
               res.status(200).json({status: "success", message:"image updates"})
           }
       }
        
        module.exports.getProfile = async (req, res) => {
            try {
                
                const token = req.headers.authorization.split(' ')[1]
                const user = jwt.verify(token, process.env.TOKEN_SECRET)
                // console.log(user)
                const EMAIL = user.email;
                // console.log(EMAIL)

                const newUser = await  UserModel.findOne({email: EMAIL});
                const profileResponse = {
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    profileImage: newUser.profileImage,
                    address: newUser.address,
                    city: newUser.city,
                    state: newUser.state,
                    zipcode: newUser.zipcode,
                }
                res.status(200).json({status: "success", profile: profileResponse })
            } catch (err) {
                res.status(500).json(err)
                console.log(err);
            }
        }
        
        module.exports.getAllUserInfo = async (req, res) => {
            try {
                const userList = await UserModel.find({})
                res.status(200).json({ status: "success", userList})
                
            } catch (err) {
                res.status(500).json(errorMessage(err))
                console.log(err);
            }
            
        }
        
        
        