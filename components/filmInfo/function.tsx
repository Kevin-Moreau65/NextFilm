export function Titlesize(Title: string) {
    if (Title.length <= 20) {
        return { fontSize: "larger" }
    } else if (Title.length >= 30) {
        return { fontSize: "0.8em" }
    } else if (Title.length >= 25) {
        return { fontSize: "1em" }
    }
}
export function Splitand(Genre: string, i: number) {
    if (Genre.indexOf("&") !== -1) {
        let GenreArray = Genre.split("&");
        if (GenreArray[0] == " Adventure") {
            GenreArray[0] = "Aventure";
        } else {
            GenreArray[0] = GenreArray[0].trim()
        }
        if (GenreArray[1] == " Adventure") {
            GenreArray[1] = "Aventure";
        } else {
            GenreArray[1] = GenreArray[1].trim()
        }
        return GenreArray.map((val: string) => <h4 key={val + i} style={GenreColor(val)}>
            {val}
        </h4>)
    } else {
        return (<h4 key={i} style={GenreColor(Genre)}>
            {Genre}
        </h4>)
    }
}
export function NoteColor(Note: number) {
    if (Note <= 4) {
        return { color: "rgb(148, 22, 22)" }
    } else if (Note > 7) {
        return { color: "rgb(2, 150, 6)" }
    } else {
        return { color: "rgb(184, 120, 2)" }
    }
}
function GenreColor(Genre: string) {
    switch (Genre) {
        case "Comédie":
            return { color: "rgb( 255, 142, 0)" };
        case "Animation":
            return { color: "rgb(5, 176, 214)" }
        case "Romance":
            return { color: "rgb(179, 16, 83)" }
        case "Aventure":
            return { color: "rgb(201, 109, 0)" }
        case "Drame":
            return { color: "rgb(124, 7, 7)" }
        case "Action":
            return { color: "rgb(229, 60, 24)" }
        case "Science-Fiction":
            return { color: "rgb(37, 186, 4)" }
        case "Fantastique":
            return { color: "rgb(81, 50, 173)" }
        case "Western":
            return { color: "rgb(184, 108, 0)" }
        case "Crime":
            return { color: "rgb(82, 0, 0)" }
        case "Thriller":
            return { color: "rgb(59, 61, 85)" }
        case "Familial":
            return { color: "rgb(0, 203, 115)" }
        case "Guerre":
            return { color: "rgb(105, 192, 11)" }
        case "Musique":
            return { backgroundColor: "white", borderRadius: "2px", color: "rgb(0, 0, 0)" }
        case "Mystère":
            return { color: "rgb(22, 181, 115)" }
    }
}
export function DureeH(heure: number) {
    let h, m;
    m = 0;
    h = Math.floor(heure / 60);
    m = heure - h * 60;
    return h + " h " + m + " min"
}