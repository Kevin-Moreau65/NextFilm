// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import lol from '../../json/filmVu.json'
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
    fs.writeFile(path.join(JSONpath + '/filmVu.json'), input, (err) => {
      if (err) {
        res.status(500).json({ res: err })
      } else {
        res.status(201).json({ res: JSON.parse(input) })
      }
    });
  } else {
    res.status(403).json({ res: "wrong" })
  }
}