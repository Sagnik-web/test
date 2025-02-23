const User = require("../Model/User")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.register =async(req,res)=>{
    const {email,password,name} = req.body

    try {

    if(!email || !password || !name){
        return res.status(400).json({
            success:false,
            msg:"Email, Password or Name not found"
        })
    }

    if(password.length<6){
        return res.status(400).json({
            success:false,
            msg:"Password Must be more than 6 char"
        })
    }

    const user = await User.findOne({email:email})
    if(user){
        return res.status(400).json({
            success:false,
            msg:"User Already Exist."
        })
    }


    const hashPassword =await bcryptjs.hash(password,12)
    const newUser = await User.create({
        email:email,
        name:name,
        password:hashPassword
    })


    res.status(200).json({
        success:true,
        msg:"User registered successfully.",
        user:newUser
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}






// The login controller function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if(!email || !password){
            return res.status(400).json({
                success:false,
                msg:"Email or Password not entered."
            })
        }

        // Step 1: Find the user by email
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Step 2: Compare the entered password with the stored hashed password
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const secretKey = process.env.SECRET_KEY
        const expireTime = process.env.EXP_TIME

        // Step 3: Create a JWT token for the user
        const token = jwt.sign(
            { userId: user._id},
            secretKey, // Secret key, use a secure one in production
            { expiresIn:expireTime } // Set the token to expire in 1 hour
        );

        // Step 4: Respond with the token
        res.status(200).json({
            success:true,
            msg:'Login successful',
            token,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false, msg: 'Server error' });
    }
}


exports.userDetails = async (req,res)=>{
    res.json({
        success:true,
        user:req.user
    })
}
