import { Router } from "express";
import { 
    purchaseStock,
    saleStock,
 } from "../controllers/inventoryController";


const router = Router();

router.post("/purchase", purchaseStock);
router.post("/sale", saleStock);

export default router;