const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

async function userRegisterController(req, res){
    try{
        // FIX: Extract 'role' from req.body
        const {email, name, password, role} = req.body;

        // Validation
        if(!email || !name || !password){
            return res.status(400).json({
                success: false,
                message: "Email, name, and password are required"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // FIX: Pass 'role' into the new userModel
        const newUser = new userModel({ email, name, password, role });
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '7d' }
        );

        // Set token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send registration email after successful user creation.
        // Do not fail registration if email delivery fails.
        try {
            await emailService.sendRegistrationEmail(user.email, user.name, req.body.role);
        } catch (emailError) {
            console.error('Registration email failed:', emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role // Optional: Good practice to return the saved role
            }
        });

    } catch(error){
        // Handle duplicate email error
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                message: "Email already exists, please use a different email address"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

async function userLoginController(req, res){
    try{
        const {email, password} = req.body;

        // Validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email and select password field
        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.REFRESH_TOKEN || process.env.JWT_SECRET || 'your_refresh_secret_key',
            { expiresIn: '7d' }
        );

        // Keep access token cookie for existing auth flow compatibility
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role // Optional: Good practice to return the role on login too
            },
            accessToken,
            refreshToken
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = {
    userRegisterController,
    userLoginController
}