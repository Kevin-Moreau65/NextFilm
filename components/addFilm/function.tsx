export async function postFilm(name: string, url: string, pwd: string, vu: boolean, popup: (msg: string, error: boolean) => void) {
    if (!url || !name) {
        return popup("Merci de remplir tout les champs", true)
    }
    try {
        let target: string[] = url.split('/')
        let mode: string = "/" + target[3] + "/" + target[4].split('-')[0]
        const object = { url: mode, name: name, pwd: pwd, vu: vu };
        const response = await fetch('/api/addFilm', {
            method: 'PUT',
            body: JSON.stringify(object),
        });
        const responseText = await response.text();
        if (JSON.parse(responseText).res === "wrong") {
            return popup("Mot de passe incorrect", true)
        } else if (JSON.parse(responseText).success !== true) {
            return popup("Une erreur s'est produite", true)
        } else {
            popup("Ajout du film effectué, ton navigateur va s'actualiser dans", false)
            setTimeout(() =>
                location.reload(), 9000)
        }
    } catch {
        return popup("Une erreur s'est produite", true)
    }
}
// function timer() {
//     let i = 9
//     setInterval(() => {i--; return i}, 1000)
// }