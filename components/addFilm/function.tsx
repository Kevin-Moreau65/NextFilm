import Popup from "../popup/popup";
export async function postFilm(name: string, url: string, pwd: string, vu: boolean) {
    if (!url || !name) {
        return alert("Non mais tu fous quoi")
    }
    let target = url.split('/')
    let mode = "/" + target[3] + "/" + target[4].split('-')[0]
    const object = { url: mode, name: name, pwd: pwd, vu: vu };
    const response = await fetch('/api/addFilm', {
        method: 'PUT',
        body: JSON.stringify(object),
    });
    const responseText = await response.text();
    if (JSON.parse(responseText).res === "wrong") {
        alert("Mot de passe incorrect sale merde")
    } else if (JSON.parse(responseText).success !== true) {
        alert("Une erreur c'est produite !")
    } else {
        location.reload()
    }
}