import { NextApiRequest, NextApiResponse } from 'next'
import { FilmOrSerie } from '../../components/film/film'
import dbConnect from '../../global/db/database'
import { MFilmVu, MFilmPasVu, MStat, Statistiques } from '../../global/db/schema'
import ParseGenre from '../../global/functions/genre'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    let films: FilmOrSerie[] = await MFilmVu.find({})
    let stat!: Statistiques;;
    let longFilm = {
        titre: "",
        duree: 0
    }
    let filmTime = 0
    let serieTime = 0
    let longSerie = {
        titre: "",
        duree: 0
    }
    let filmTotal = 0
    let serieTotal = 0
    let courtFilm: any = null
    let courtSerie: any = null
    let plusFilmNote = {
        titre: "",
        note: 0
    }
    let plusSerieNote = {
        titre: "",
        note: 0
    }
    let moinsFilmNote = {
        titre: "",
        note: 10
    }
    let moinsSerieNote = {
        titre: "",
        note: 10
    }
    try {
        films.forEach(film => {
            if (film.runtime) {
                if (courtFilm === null) {
                    courtFilm.duree = film.runtime
                    courtFilm.titre = film.title
                }
                if (film.runtime < courtFilm.duree) {
                    courtFilm.duree = film.runtime
                    courtFilm.titre = film.title
                }
                if (film.runtime > longFilm.duree) {
                    longFilm.duree = film.runtime
                    longFilm.titre = film.title
                }
                if (film.vote_average > plusFilmNote.note) {
                    plusFilmNote.note = film.vote_average
                    plusFilmNote.titre = film.title
                }
                if (film.vote_average < moinsFilmNote.note) {
                    moinsFilmNote.note = film.vote_average
                    moinsFilmNote.titre = film.title
                }
                let genre = ParseGenre(film.genres)
                genre.forEach(g => {
                    if (stat.film.genre[g]) {
                        stat.film.genre[g]++
                    } else {
                        stat.film.genre[g] = 1
                    }
                })
                let annee = film.release_date.toDateString().split("-")[0]
                annee = annee.slice(0, -1) + "0"
                if (!stat.film.Annee[annee]) {
                    stat.film.Annee[annee] = 1
                } else {
                    stat.film.Annee[annee]++
                }
                filmTotal++
                filmTime += film.runtime
            } else {
                if (courtSerie === null) {
                    courtSerie.duree = film.episode_run_time[0]
                    courtSerie.titre = film.name
                }
                if (film.episode_run_time[0] < courtSerie.duree) {
                    courtSerie.duree = film.episode_run_time[0]
                    courtSerie.titre = film.name
                }
                if (film.episode_run_time[0] > longSerie.duree) {
                    longSerie.duree = film.episode_run_time[0]
                    longSerie.titre = film.name
                }
                if (film.vote_average > plusSerieNote.note) {
                    plusSerieNote.note = film.vote_average
                    plusSerieNote.titre = film.name
                }
                if (film.vote_average < moinsSerieNote.note) {
                    moinsSerieNote.note = film.vote_average
                    moinsSerieNote.titre = film.name
                }
                let genre = ParseGenre(film.genres)
                genre.forEach(g => {
                    if (stat.film.genre[g]) {
                        stat.film.genre[g]++
                    } else {
                        stat.film.genre[g] = 1
                    }
                })
                let annee = film.first_air_date.toDateString().split("-")[0]
                annee = annee.slice(0, -1) + "0"
                if (!stat.serie.Annee[annee]) {
                    stat.serie.Annee[annee] = 1
                } else {
                    stat.serie.Annee[annee]++
                }
                serieTotal++
                serieTime += film.episode_run_time[0]
            }
        })
        let data = await MStat.find({})
        stat.film.total = filmTotal
        stat.film.plusLong = longFilm
        stat.film.plusCourt = courtFilm
        stat.film.mieuxNote = plusFilmNote
        stat.film.moinsNote = moinsFilmNote
        stat.serie.total = serieTotal
        stat.serie.plusLong = longSerie
        stat.serie.plusCourt = courtSerie
        stat.serie.mieuxNote = plusSerieNote
        stat.serie.moinsNote = moinsSerieNote
        data[0] = stat
        const stats = await MStat.findByIdAndUpdate(data[0]._id.toString(), data[0], {
            new: true,
            runValidators: true,
        })
        if (!stats) {
            res.send("error")
        } else {
            res.send(stats)
        }
    } catch (error) {
        res.send(error)
    }
}
