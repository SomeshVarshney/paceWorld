import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      brand,
      purchasePrice,
      sellingPrice,
      boxQuantity,
      unitQuantity,
      lowStockThreshold,
      categoryId,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        purchasePrice,
        sellingPrice,
        boxQuantity,
        unitQuantity,
        lowStockThreshold,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      brand,
      purchasePrice,
      sellingPrice,
      boxQuantity,
      unitQuantity,
      lowStockThreshold,
      categoryId,
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        brand,
        purchasePrice,
        sellingPrice,
        boxQuantity,
        unitQuantity,
        lowStockThreshold,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const transactions =
      await prisma.inventoryTransaction.count({
        where: {
          productId: id,
        },
      });

    if (transactions > 0) {
      return res.status(400).json({
        message:
          "Cannot delete product. Inventory transactions exist.",
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};