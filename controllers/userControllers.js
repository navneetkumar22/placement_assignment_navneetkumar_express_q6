import User from "../model/user.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

/************************************************************** 
 * @SIGN_UP 
 * @Request_type POST
 * @Route /signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ***************************************************************/
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new Error("All fields are required")
        }

        //check if user allready exists
        if (await User.findOne({ email })) {
            throw new Error("User already exists")
        }

        //encrypt the password - before saving into database
        const encryptedPwd = await bcrypt.hash(password, 10);

        //register the user
        const user = await User.create({ name, email, password: encryptedPwd });

        //create token
        const userToken = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "4h"
        })

        //save token to database
        user.token = userToken;

        //set password to undefined before sending it to frontend
        user.password = undefined;

        //send response with token
        res.status(200).json({
            success: true,
            message: "User created successfully",
            token: userToken,
            user
        })

    } catch (error) {
        console.log(error);
    }
}


/************************************************************** 
 * @SIGN_IN 
 * @Request_type POST
 * @Route /login
 * @description User login Controller for signing in the user
 * @parameters email, password
 * @returns User Object
 ***************************************************************/

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            throw new Error("All fields are required")
        }

        //check if user is registered or not
        const userExists = await User.findOne({ email });
        if (!userExists) {
            throw new Error("You are not registered")
        }

        //compare password
        const validUser = await bcrypt.compare(password, userExists.password);
        if (!validUser) {
            throw new Error("Invalid password entered")
        }

        //if user is registered and correct password is entered - send token
        if (userExists && validUser) {
            const userToken = JWT.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
                expiresIn: "4h"
            })


            userExists.token = userToken;
            userExists.password = undefined;

            //send cookies with token
            const cookieOptions = {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.status(200).cookie("token", userToken, cookieOptions).json({
                success: true,
                user: userExists
            })
        }

    } catch (error) {
        console.log(error);
    }
}



/************************************************************** 
 * @DASHBOARD
 * @Request_type GET
 * @Route /dashboard
 * @description User dashboard Controller for showing user details
 * @parameters user should be logged in
 * @returns User Object
 ***************************************************************/
export const userDashboard = async (req, res) => {
    try {
        const userId = req.user;

        //find user
        const user = await User.findById(userId);

        //send response
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}