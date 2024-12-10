

async function getSets() {
    return await fetch("/v1/sets");
}

console.log(getSets());