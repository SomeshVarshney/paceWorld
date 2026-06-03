import { Router } from "express";
import { 
    purchaseStock,
    saleStock,
    getTransactions,
 } from "../controllers/inventoryController";


const router = Router();

router.post("/purchase", purchaseStock);
router.post("/sale", saleStock);

router.get(
  "/transactions",
  getTransactions
);

export default router;