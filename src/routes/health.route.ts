import { Router } from "express";
import { checkHealth } from "@controllers";
import { asyncHandler } from "@utils";

const router = Router();

router.get("/", asyncHandler(checkHealth));

export default router;
