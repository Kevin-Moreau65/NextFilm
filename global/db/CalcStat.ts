import { NextApiRequest, NextApiResponse } from 'next'
import { FilmOrSerie } from '../../components/film/film'
import dbConnect from './database'
import { MFilmVu, MFilmPasVu, MStat, Statistiques } from './schema'
import ParseGenre from '../functions/genre'

export async function CalcStatsRegen() {
    await dbConnect()
    let films = await MFilmVu.find({})
    let stat: Statistiques = {
        film: {
            total: 0,
            plusLong: {
                duree: 0,
                titre: ''
            },
            plusCourt: {
                duree: 0,
                titre: ''
            },
            genre: {},
            mieuxNote: {
                note: 0,
                titre: ''
            },
            moinsNote: {
                note: 0,
                titre: ''
            },
            Annee: {},
            totalTime: 0
        },
        serie: {
            total: 0,
            plusLong: {
                duree: 0,
                titre: ''
            },
            plusCourt: {
                duree: 0,
                titre: ''
            },
            genre: {},
            mieuxNote: {
                note: 0,
                titre: ''
            },
            moinsNote: {
                note: 0,
                titre: ''
            },
            Annee: {},
            totalTime: 0
        }
    }
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
    let courtFilm: any = {
        titre: "",
        duree: null
    }
    let courtSerie: any =
    {
        titre: "",
        duree: null
    }
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
        for await (let val of Object.values(films[0].film)) {
            const res = await fetch("https://api.themoviedb.org/3" +
                val +
                "?api_key=c8ba3cbfd981404e3c6a588adfbce2d5&language=fr-FR")
            const film: FilmOrSerie = await res.json()
            if (film.runtime) {
                if (courtFilm.duree == null) {
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
                if (film.release_date) {
                    let annee = film.release_date.toString().split("-")[0]
                    annee = annee.slice(0, -1) + "0"
                    if (!stat.film.Annee[annee]) {
                        stat.film.Annee[annee] = 1
                    } else {
                        stat.film.Annee[annee]++
                    }
                }
                filmTotal++
                filmTime += film.runtime
            } else {
                if (courtSerie.duree === null) {
                    courtSerie.duree = film.episode_run_time[0] * film.number_of_episodes
                    courtSerie.titre = film.name
                }
                if (film.episode_run_time[0] * film.number_of_episodes < courtSerie.duree) {
                    courtSerie.duree = film.episode_run_time[0] * film.number_of_episodes
                    courtSerie.titre = film.name
                }
                if (film.episode_run_time[0] * film.number_of_episodes > longSerie.duree) {
                    longSerie.duree = film.episode_run_time[0] * film.number_of_episodes
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
                    if (stat.serie.genre[g]) {
                        stat.serie.genre[g]++
                    } else {
                        stat.serie.genre[g] = 1
                    }
                })
                if (film.first_air_date) {
                    let annee = film.first_air_date.toString().split("-")[0]
                    annee = annee.slice(0, -1) + "0"
                    if (!stat.serie.Annee[annee]) {
                        stat.serie.Annee[annee] = 1
                    } else {
                        stat.serie.Annee[annee]++
                    }
                }
                serieTotal++
                serieTime += film.episode_run_time[0] * film.number_of_episodes
            }
        }
        let data = await MStat.find({})
        stat.film.total = filmTotal
        stat.film.plusLong = longFilm
        stat.film.plusCourt = courtFilm
        stat.film.mieuxNote = plusFilmNote
        stat.film.moinsNote = moinsFilmNote
        stat.film.totalTime = filmTime
        stat.serie.total = serieTotal
        stat.serie.plusLong = longSerie
        stat.serie.plusCourt = courtSerie
        stat.serie.mieuxNote = plusSerieNote
        stat.serie.moinsNote = moinsSerieNote
        stat.serie.totalTime = serieTime
        data[0].film = stat.film
        data[0].serie = stat.serie
        console.log(stat.serie)
        const stats = await MStat.findByIdAndUpdate(data[0]._id.toString(), data[0], {
            new: true,
        })
        if (!stats) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
export async function CalcStats(link: string) {
    await dbConnect()
    let stats = await MStat.find({})
    try {
        const data = await fetch("https://api.themoviedb.org/3" +
            link +
            "?api_key=c8ba3cbfd981404e3c6a588adfbce2d5&language=fr-FR")
        const film: FilmOrSerie = await data.json()
        if (film.runtime) {
            stats[0].film.total++
            stats[0].film.totalTime += film.runtime
            if (film.runtime < stats[0].film.plusCourt.duree) {
                stats[0].film.plusCourt.duree = film.runtime
                stats[0].film.plusCourt.titre = film.title
            }
            if (film.runtime > stats[0].film.plusLong.duree) {
                stats[0].film.plusLong.duree = film.runtime
                stats[0].film.plusLong.titre = film.title
            }
            if (film.vote_average > stats[0].film.mieuxNote.note) {
                stats[0].film.mieuxNote.note = film.vote_average
                stats[0].film.mieuxNote.titre = film.title
            }
            if (film.vote_average < stats[0].film.moinsNote.note) {
                stats[0].film.moinsNote.note = film.vote_average
                stats[0].film.moinsNote.titre = film.title
            }
            let genre = ParseGenre(film.genres)
            genre.forEach(g => {
                if (stats[0].film.genre[g]) {
                    stats[0].film.genre[g]++
                } else {
                    stats[0].film.genre[g] = 1
                }
            })
            if (film.release_date) {
                let annee = film.release_date.toString().split("-")[0]
                annee = annee.slice(0, -1) + "0"
                if (!stats[0].film.Annee[annee]) {
                    stats[0].film.Annee[annee] = 1
                } else {
                    stats[0].film.Annee[annee]++
                }
            }
        } else {
            stats[0].serie.total++
            stats[0].serie.totalTime += film.episode_run_time[0] * film.number_of_episodes
            if (film.episode_run_time[0] * film.number_of_episodes < stats[0].serie.plusCourt.duree) {
                stats[0].serie.plusCourt.duree = film.episode_run_time[0] * film.number_of_episodes
                stats[0].serie.plusCourt.titre = film.name
            }
            if (film.episode_run_time[0] * film.number_of_episodes > stats[0].serie.plusLong.duree) {
                stats[0].serie.plusLong.duree = film.episode_run_time[0] * film.number_of_episodes
                stats[0].serie.plusLong.titre = film.name
            }
            if (film.vote_average > stats[0].serie.mieuxNote.note) {
                stats[0].serie.mieuxNote.note = film.vote_average
                stats[0].serie.mieuxNote.titre = film.name
            }
            if (film.vote_average < stats[0].serie.moinsNote.note) {
                stats[0].serie.moinsNote.note = film.vote_average
                stats[0].serie.moinsNote.titre = film.name
            }
            let genre = ParseGenre(film.genres)
            genre.forEach(g => {
                if (stats[0].serie.genre[g]) {
                    stats[0].serie.genre[g]++
                } else {
                    stats[0].serie.genre[g] = 1
                }
            })
            if (film.first_air_date) {
                let annee = film.first_air_date.toString().split("-")[0]
                annee = annee.slice(0, -1)
            }
        }
        let result = await MStat.findByIdAndUpdate(stats[0]._id.toString(), stats[0], {
            new: true,
        })
        if (!result) return false
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}