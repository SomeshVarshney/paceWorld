import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalProducts = await prisma.product.count();

    const totalCategories = await prisma.category.count();

    const totalPurchases =
      await prisma.inventoryTransaction.count({
        where: {
          type: "PURCHASE",
        },
      });

    const totalSales =
      await prisma.inventoryTransaction.count({
        where: {
          type: "SALE",
        },
      });

    const lowStockProducts =
      await prisma.product.findMany({
        where: {
          boxQuantity: {
            lte: 5,
          },
        },
      });

    const inventory = await prisma.product.findMany();

    const inventoryValue = inventory.reduce(
      (total, product) =>
        total +
        (
          product.boxQuantity +
          product.unitQuantity
        ) *
          product.purchasePrice,
      0
    );

    res.json({
      totalProducts,
      totalCategories,
      totalPurchases,
      totalSales,
      lowStockProducts,
      inventoryValue,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};