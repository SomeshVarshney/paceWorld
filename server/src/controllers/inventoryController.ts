import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const purchaseStock = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      productId,
      boxQuantity,
      unitQuantity,
      notes,
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        boxQuantity: {
          increment: boxQuantity,
        },
        unitQuantity: {
          increment: unitQuantity,
        },
      },
    });

    await prisma.inventoryTransaction.create({
      data: {
        type: "PURCHASE",
        boxQuantity,
        unitQuantity,
        notes,
        productId,
      },
    });

    res.json({
      message: "Stock added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add stock",
    });
  }
};

export const saleStock = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      productId,
      boxQuantity,
      unitQuantity,
      notes,
    } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      product.boxQuantity < boxQuantity ||
      product.unitQuantity < unitQuantity
    ) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        boxQuantity: {
          decrement: boxQuantity,
        },
        unitQuantity: {
          decrement: unitQuantity,
        },
      },
    });

    await prisma.inventoryTransaction.create({
      data: {
        type: "SALE",
        boxQuantity,
        unitQuantity,
        notes,
        productId,
      },
    });

    res.json({
      message: "Stock sold successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to sell stock",
    });
  }
};