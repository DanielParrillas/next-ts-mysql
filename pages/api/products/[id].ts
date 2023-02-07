import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/config/db";
import { RowDataPacket } from "mysql2";
import { Product } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);
    case "DELETE":
      return await deleteProduct(req, res);
    case "PUT":
      return await updateProduct(req, res);
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const [result] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM product WHERE id = ?",
      [id]
    );
    console.log(result);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM product WHERE id = ?", [id]);
    return res.status(204).json({});
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: (error as Error).message });
    return res.status(500).json({ message: "error api" });
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { name, description, price }: Product = req.body;
    const result = await pool.query(
      "UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
