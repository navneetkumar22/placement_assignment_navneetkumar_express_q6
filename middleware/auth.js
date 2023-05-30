import JWT from "jsonwebtoken";

//middleware function to verify if user is logged in or not

export const isLoggedIn = async (req, res, next) => {
    try {
        //grab token from cookies or headers like this
        const token = req.cookies.token;

        if (!token) {
            throw new Error("You are not authorized to access this route")
        }

        //if token is present - verify it
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id;

        next();

    } catch (error) {
        console.log(error);
    }
}