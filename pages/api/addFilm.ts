// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
type Data = {
  url: string,
  name: string,
  pwd: string,
  vu: boolean
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let body: Data = JSON.parse(req.body)
  if (body.pwd === "Angele1972") {
    let JSONpath = path.join(__dirname + '/../../../../json/')
    let rawdata: any = fs.readFileSync(path.join(JSONpath + '/filmVu.json'));
    let data = JSON.parse(rawdata);
    data[body.name] = body.url
    let input = JSON.stringify(data)
    fs.writeFileSync(path.join(JSONpath + '/filmVu.json'), input);
    res.status(201).json({ res: "OK" })
  } else {
    res.status(403).json({ res: "wrong" })
  }
}