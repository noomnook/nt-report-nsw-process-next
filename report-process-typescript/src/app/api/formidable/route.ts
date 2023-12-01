// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   res.status(200).json({ name: "hello file uploader" });
// }

import { NextResponse } from "next/server";

export async function GET(){
  return NextResponse.json({
    hello: "world",
  });
}