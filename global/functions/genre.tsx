import { Genre } from '../../components/film/filmInterface'
export default function ParseGenre(genre: Genre[]) {
    let result: string[] = []
    genre.forEach(genre => {
        if (genre.name.indexOf("&") != -1) {
            let genreArray = genre.name.trim().replace("Adventure", "Aventure").replaceAll(" ", "").split("&")
            result.push(...genreArray)
        }
        else {
            let genreResult = genre.name.replace("-", "").replaceAll(" ", "")
            result.push(genreResult)
        }
    })
    return result
}