import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../global/db/database'
import { MFilmVu, MFilmPasVu } from '../../global/db/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let body = JSON.parse(req.body)
    if (body.vu === undefined) {
        return res.status(401).json({ success: "undefined" })
    } else if (body.pwd !== "Angele1972") {
        return res.status(400).json({ res: "wrong" })
    }
    await dbConnect()
    try {
        const films = body.vu ? MFilmVu : MFilmPasVu
        let data = await films.find({})
        delete data[0].film[body.name]
        const film = await films.findByIdAndDelete(data[0]._id.toString())
        if (!film) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: film })
    } catch (error) {
        res.status(400).json({ success: error })
    }
}
// let phrase: string = "rien" -> première ✨ligne de code✨ d'Angèle 👏