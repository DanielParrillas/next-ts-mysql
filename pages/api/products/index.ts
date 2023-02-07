import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/config/db";
import { Product } from "@/types";
import { ResultSetHeader } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    case "POST":
      return await saveProduct(req, res);
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //throw new Error("Error intencional")
    const [result] = await pool.query("SELECT * FROM product");
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const saveProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, price }: Product = req.body;
    console.log("creating a product");
    console.log(req.body);
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO product SET ?",
      {
        name,
        description,
        price,
      }
    );

    console.log(result);
    return res
      .status(200)
      .json({ name, price, description, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
