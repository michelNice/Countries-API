
export async function getCountryDetails(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${name} (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data[0];
}

