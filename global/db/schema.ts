import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const FilmVu = new mongoose.Schema({
    film: {
        type: Object,
        required: true
    }
},
    { collection: 'vu' })
const FilmPasVu = new mongoose.Schema({
    film: {
        type: Object,
        required: true
    }
},
    { collection: 'pasvu' })
export const MFilmVu = mongoose.models.FilmVu || mongoose.model('FilmVu', FilmVu)
export const MFilmPasVu = mongoose.models.FilmPasVu || mongoose.model('FilmPasVu', FilmPasVu)