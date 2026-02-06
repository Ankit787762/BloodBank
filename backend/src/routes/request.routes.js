import { Router } from "express";
import {
  addRequest,
  myRequests,
  getAllRequests,
  updateRequestStatus,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const requestRouter = Router();

// User side
requestRouter.post("/addrequest", verifyJWT, addRequest);
requestRouter.get("/myrequests", verifyJWT, myRequests);

// Admin side
requestRouter.get("/getallrequests", verifyJWT, getAllRequests); // ✅ new route
requestRouter.put("/updaterequest/:requestId", verifyJWT, updateRequestStatus); // ✅ id param

export default requestRouter;
