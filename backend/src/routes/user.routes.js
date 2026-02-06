import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
 } from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

//secured routes
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/refreshtoken").post(refreshAccessToken)
userRouter.route("/changepassword").post(verifyJWT,changeCurrentPassword)
userRouter.route("/currentuser").get(verifyJWT,getCurrentUser)
userRouter.route("/updateaccount").patch(verifyJWT,updateAccountDetails)



export default userRouter