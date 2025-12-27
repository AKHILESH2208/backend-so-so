import {User} from '../models/user.model.js';

const registerUser = async (req, res, next) => {
    try {
        const {username,email,password}=req.body;

        // basic validation

        if (!username || !email || !password){
            return res.status(400).json({message:"All fields are important"})
        }

        // If User exists already
        const existing=await User.findOne({email:email.toLowerCase()})

        if(existing){
            return res.status(400).json({message:"User already exists"});
        }

        // Create User
         const user= await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false,
         });

         res.status(201).json({
            message:"User registered",
            user:{id:user.id,email:user.email,username:user.username}
         });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        // checking if the user already exists
        const {email,password}=req.body;

        const user=await User.findOne({
            email:email.toLowerCase()
        });
 
        if(!user) return res.status(400).json({
            message: "User not found"
        });

        // Compare the passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        res.status(200).json({
            message:"User Logged in",
            user:{
                id:user.id,
                email:user.email,
                username:user.username
            }
        })
    } catch (error) {
        next(error);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        const {email}=req.body;
        const user= await User.findOne({
            email
        })

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        res.status(200).json({
            message:"Logout Successfully"
        })
    }
    catch(error){
        next(error);
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}