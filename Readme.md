# **Project with JWT**

This is a minor project illustrating use of JWT in registering a user and login a user.

Also a auth middleware function is created using JWT which checks if a user is logged in or not.

<br/>

## Routes
- **/signup** - route for sign up a user
- **/login** - route for login a user

<br/>

## Folder Structure
- **/middleware** - auth.js - authorization middleware to check if user is logged in.
- **/config/database.js** - this file contains the function to connect to database
- **/routes/userRoutes.js** - contains all the routes
- **/controllers/userControllers.j**s** - contains all controllers for user
- **/app.js** - this is file where we define all the middlewares and functionalities
- **/index.js** - this is the main file to run in node