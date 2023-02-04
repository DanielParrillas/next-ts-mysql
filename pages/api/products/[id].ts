import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/config/db";
import { RowDataPacket } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const [result] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM product WHERE id = ?",
    [id]
  );
  console.log(result);

  return res.status(200).json(result[0]);
}
