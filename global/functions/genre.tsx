import { Genre } from '../../components/film/filmInterface'
export default function ParseGenre(genre: Genre[]) {
    let result: string[] = []
    genre.forEach(genre => {
        if (genre.name.indexOf("&") != -1) {
            let genreArray = genre.name.replace(/ /g, "")
            genreArray = genreArray.replace("Adventure", "Aventure")
            let resultArray = genreArray.split("&")
            result.push(...resultArray)
        }
        else {
            let genreResult = genre.name.replace(/-/g, "")
            genreResult = genreResult.replace(/ /g, "")
            result.push(genreResult)
        }
    })
    return result
}