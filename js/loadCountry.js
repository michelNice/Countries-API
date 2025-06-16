import { getCountryDetails } from "./countryDetail.js";

async function loadCountry() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  const container = document.querySelector('.country-container');

  if (!name) {
    container.innerHTML = '<h2>No country specified</h2>';
    return;
  }

  try {
    const country = await getCountryDetails(name);

    let bordersHTML = '<p><strong>Borders:</strong> None</p>';

    if (country.borders && country.borders.length > 0) {
      const codes = country.borders.join(',');
      const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);
      const bordersData = await bordersResponse.json();

      const borderLinks = bordersData.map(borderCountry => {
        return `

        <a href="country.html?name=${encodeURIComponent(borderCountry.name.common)}">${borderCountry.name.common}</a>`;
      }).join(' ');

      bordersHTML = `<p class="container__border"><strong>Borders:</strong> ${borderLinks}</p>`;
    }

    container.innerHTML = `
   
    <div class="container__details">
      <a class="btn__back" href="index.html">← Back</a>
        <div class="card__details">
          <div>
              <img class="country__img" src="${country.flags.svg}" alt="${country.name.common} flag">
          </div>
          
          <div class="country__details">
            <div class="country__detais_items">
                <h2>${country.name.common}</h2>
                <p>Population: <strong> ${country.population.toLocaleString()} </strong></p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital?.[0] ?? 'No capital'}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages ?? {}).join('')}</p>
                ${bordersHTML}
                <p></p>
            </div>
            <div class="country__detais_items">
                <p><strong>Top level Domain:</strong> ${country.tld?.join(', ') ?? 'N/A'}</p>
                <p><strong>Currencies:</strong> ${Object.values(country.currencies ?? {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
                 <p><strong>Languages:</strong> ${Object.values(country.languages ?? {}).join(', ')}</p>

            </div>
            
          </div>
        </div>
    </div>
    `;

  } catch (error) {
    document.body.innerHTML = `<h2>Error loading country: ${error.message}</h2>`;
  }
}

loadCountry();
