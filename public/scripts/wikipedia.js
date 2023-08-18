export async function getRandomPage(limit = 1) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=${limit}&prop=info&origin=*`;
    const response = await fetch(url);
    const json = await response.json();
    const data = json.query.pages;
    const key = Object.keys(data)[0];

    return key;
}

export async function getPageIntro(pageid, sentences = 5) {
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&exsentences=${sentences}&explaintext&redirects=1&pageids=${pageid}&origin=*`;
    const response = await fetch(url);
    const json = await response.json();
    const data = json.query.pages;
    const key = Object.keys(data)[0];

    return data[key].extract;
}
