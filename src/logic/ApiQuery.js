function simpleGetRaw(url) {
    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
               return result;
            },
            (error) => {
                return -404;
            }
        )
}


export function simpleGet(url) {
    return simpleGetRaw(url)
}