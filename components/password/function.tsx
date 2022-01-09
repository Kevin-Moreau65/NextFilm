export async function callAPI(name: string, urlAPI: string, pwd: string, vu: boolean) {
    let object = {
        vu: vu,
        name: name,
        pwd: pwd
    }
    const response = await fetch(urlAPI, {
        body: JSON.stringify(object)
    })
    const responseText = await response
    console.log(responseText)
}
