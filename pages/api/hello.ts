// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../config/db";

type Data = {
  name: string;
  now: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [rows] = await pool.query("SELECT NOW()");
  let now: string = "";
  console.log(rows);
  if (Array.isArray(rows)) now = JSON.stringify(rows[0]);

  res.status(200).json({ name: "John Doe", now });
}
