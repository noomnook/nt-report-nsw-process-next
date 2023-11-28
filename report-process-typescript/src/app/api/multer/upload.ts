import { multerUpload } from "../../../../services/upload";

const handler = async (req: { body: any; }, res: { json: (arg0: { valid: boolean; status: string; }) => any; }) => {
  console.log("API Upload");
  const result = await multerUpload(req.body);
  return res.json(result)
}

export default handler;