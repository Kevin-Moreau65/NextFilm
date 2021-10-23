export async function postName(name: string, url: string, pwd: string) {
    let target = url.split('/')
    let mode = "/" + target[1] + "/" + target[2].split('-')[0]
    const object = { url: mode, name: name, pwd: pwd };
    const response = await fetch('/api/names', {
        method: 'POST',
        body: JSON.stringify(object)
    });
    const responseText = await response.text();
    console.log(responseText); // logs 'OK'
}
