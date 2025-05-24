export async function getCountryDetails(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

    if (!response.ok) {
        throw new Error(`Could not fetch details for ${name}`);
    }

    const data = await response.json();

    if(data.length === 0){

           throw new Error(`No data found for ${name}`);
    }

    return data[0];

}

