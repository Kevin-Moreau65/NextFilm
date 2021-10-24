export async function postFilm(name: string, url: string, pwd: string, vu: boolean) {
    let target = url.split('/')
    let mode = "/" + target[3] + "/" + target[4].split('-')[0]
    const object = { url: mode, name: name, pwd: pwd, vu: vu };
    const response = await fetch('/api/addFilm', {
        method: 'POST',
        body: JSON.stringify(object)
    });
    const responseText = await response.text();
    console.log(responseText)
    if (JSON.parse(responseText).res === "wrong") {
        alert("Mot de passe incorrect sale merde")
    } else if (JSON.parse(responseText).res === "OK") {
        location.reload()
    }
}
