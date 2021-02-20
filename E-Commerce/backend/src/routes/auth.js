import express from "express";
import { signup, signin, requireSignin } from "../controller/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).send({
//     user: "profile",
//   });
// });

export default router;
