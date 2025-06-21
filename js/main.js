async function restCountries() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages`);
    const data = await response.json();

    const container = document.querySelector('.container');
    const countryName = document.querySelector('#countryName');
    const btnClear = document.querySelector('.clear-btn');
    const selectByregion = document.querySelector('#selectByregion');

    let currentSearch = '';
    let currentRegion = '';

    btnClear.addEventListener('click', () => {
      countryName.value = '';
      currentSearch = '';
      applyFilter();
    });

    countryName.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilter();
    });

    selectByregion.addEventListener('change', (e) => {
      currentRegion = e.target.value;
      applyFilter();
    });

    function applyFilter() {
      let filteredCountries = data;

      if (currentRegion && currentRegion !== 'All') {
        filteredCountries = filteredCountries.filter(country =>
          country.region?.toLowerCase() === currentRegion.toLowerCase()
        );
      }

      if (currentSearch) {
        filteredCountries = filteredCountries.filter(country =>
          country.name.common.toLowerCase().includes(currentSearch)
        );
      }

      filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));

      if (filteredCountries.length === 0) {
        console.log(`No countries found${currentRegion ? ` in ${currentRegion}` : ''}${currentSearch ? ` matching "${currentSearch}"` : ''}`);
      }

      renderCountry(filteredCountries);
    }

    function renderCountry(countries) {
      container.innerHTML = '';

      if (countries.length === 0) {
        container.innerHTML = '<p class="no__country">No countries found...</p>';
        return;
      }

      countries.forEach(({ flags, name, region, population, capital }) => {
        const html = `
          <a href="country.html?name=${encodeURIComponent(name.common)}" class="card-link">
            <div class="card">
              <img src="${flags.png}" alt="${name.common} flag">
              <h3>${name.common}</h3>
              <p>Population: <strong>${population.toLocaleString()} </strong></p>
              <p>Region: <strong>${region}</strong></p>
              <p>Capital: <strong>${capital ? capital[0] : 'No capital'}</strong></p>
            </div>
          </a>
        `;
        container.innerHTML += html;
      });
    }

    // Initial render
    renderCountry(data);

  } catch (error) {
    console.error(`Something went wrong, please try again: ${error}`);
  }
}



// Exportando a função para o teste funcionar
export { restCountries };

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    restCountries();
  });
}



