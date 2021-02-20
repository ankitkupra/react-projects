import express from "express";
import {
  signup,
  signin,
  requireSignin,
} from "../../controller/admin/adminAuth.js";

const router = express.Router();

router.post("admin/signin", signin);
router.post("admin/signup", signup);

export default router;
