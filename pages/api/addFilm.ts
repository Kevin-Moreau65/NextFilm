// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import json from '../../json/filmPasVu.json'
import fs from 'fs'
import path from 'path'
type Data = {
  res?: string,
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let pwd = req.query.pwd
  if (pwd === "Angele1972") {
    let JSONpath = path.join(__dirname + '/../../../../json/')
    let rawdata: any = fs.readFileSync(path.join(JSONpath + '/test.json'));
    let data = JSON.parse(rawdata);
    let name: any = req.query.url
    data[name] = req.query.n
    let input = JSON.stringify(data)
    fs.writeFileSync(path.join(JSONpath + '/test.json'), input);
    res.status(201).json({ query: req.query, json: json })
  } else {
    res.status(403).json({ res: "Mauvais mot de passe" })
  }
}