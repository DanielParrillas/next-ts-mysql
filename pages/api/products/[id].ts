import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`query: ${req.query}`);
  console.log(req.query);
  console.log(`method: ${req.method}`);
  res.status(200).json("Getting one product " + req.query.id);
}
