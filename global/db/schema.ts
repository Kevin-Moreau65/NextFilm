import mongoose from 'mongoose'

const FilmVu = new mongoose.Schema({
    film: {
        type: Object,

    }
},
    { collection: 'vu' })
export interface Statistiques {
    film: {
        total: number,
        plusLong: {
            duree: number,
            titre: string
        },
        plusCourt: {
            duree: number,
            titre: string
        },
        genre: {
            [key: string]: number
        },
        mieuxNote: {
            note: Number,
            titre: String,
        },
        moinsNote: {
            note: Number,
            titre: String,
        },
        Annee: {
            [key: string]: number
        },
        totalTime: number
    },
    serie: {
        total: number,
        plusLong: {
            duree: Number,
            titre: String,
        },
        plusCourt: {
            duree: Number,
            titre: String,
        },
        genre: {
            [key: string]: number
        },
        mieuxNote: {
            note: Number,
            titre: String,
        },
        moinsNote: {
            note: Number,
            titre: String,
        },
        Annee: {
            [key: string]: number
        },
        totalTime: number
    }
}
const Stats = new mongoose.Schema<Statistiques>({
    film: {
        total: {
            type: Number,

        },
        plusLong: {
            duree: {
                type: Number,

            },
            titre: {
                type: String,

            }
        },
        plusCourt: {
            duree: {
                type: Number,

            },
            titre: {
                type: String
            }
        },
        genre: {
            Comédie: Number,
            Animation: Number,
            Romance: Number,
            Aventure: Number,
            Drame: Number,
            Action: Number,
            ScienceFiction: Number,
            Fantastique: Number,
            Western: Number,
            Crime: Number,
            Thriller: Number,
            Familial: Number,
            Guerre: Number,
            Musique: Number,
            Mystère: Number
        },
        mieuxNote: {
            note: {
                type: Number,

            },
            titre: {
                type: String,

            }
        },
        moinsNote: {
            note: {
                type: Number,

            },
            titre: {
                type: String,

            }
        },
        Annee: {
            type: Object,

        },
        totalTime: {
            type: Number,
        },
    },
    serie: {
        total: {
            type: Number
        },
        plusLong: {
            duree: {
                type: Number,
            },
            titre: {
                type: String
            }
        },
        plusCourt: {
            duree: {
                type: Number,
            },
            titre: {
                type: String,
            }
        },
        genre: {
            Comédie: Number,
            Animation: Number,
            Romance: Number,
            Aventure: Number,
            Drame: Number,
            Action: Number,
            ScienceFiction: Number,
            Fantastique: Number,
            Western: Number,
            Crime: Number,
            Thriller: Number,
            Familial: Number,
            Guerre: Number,
            Musique: Number,
            Mystère: Number
        },
        mieuxNote: {
            note: {
                type: Number,
            },
            titre: {
                type: String,
            }
        },
        moinsNote: {
            note: {
                type: Number,
            },
            titre: {
                type: String,
            }
        },
        Annee: {
            type: Object,
        },
        totalTime: {
            type: Number,
        }
    }
},
    { collection: 'stats' })
const FilmPasVu = new mongoose.Schema({
    film: {
        type: Object,

    }
},
    { collection: 'pasvu' })
export const MFilmVu = mongoose.models.FilmVu || mongoose.model('FilmVu', FilmVu)
export const MFilmPasVu = mongoose.models.FilmPasVu || mongoose.model('FilmPasVu', FilmPasVu)
export const MStat = mongoose.models.Stat || mongoose.model('Stat', Stats)