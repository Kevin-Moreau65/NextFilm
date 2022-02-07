import { NextApiRequest, NextApiResponse } from 'next'
import { CalcStats } from '../../global/db/CalcStat'
import dbConnect from '../../global/db/database'
import { MFilmVu, MFilmPasVu } from '../../global/db/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body = JSON.parse(req.body)
  if (body.vu === undefined) {
    return res.status(401).json({ success: false })
  } else if (body.pwd !== "Angele1972") {
    return res.status(400).json({ res: "wrong" })
  }
  await dbConnect()
  try {
    const films = body.vu ? MFilmVu : MFilmPasVu
    let data = await films.find({})
    data[0].film[body.name] = body.url
    const film = await films.findByIdAndUpdate(data[0]._id.toString(), data[0], {
      new: true,
      runValidators: true,
    })
    if (!film) return res.status(400).json({ success: false })
    if (body.vu) {
      let stats = await CalcStats(body.url)
      if (!stats) return res.status(400).json({ success: false })
      return res.json({ success: true })
    }
    return res.json({ success: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: error })
  }
}
