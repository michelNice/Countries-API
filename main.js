fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages`).then(response => response.json())
.then(data => {

  let container = document.querySelector('.container')
  const countryName = document.querySelector('#countryName')
  const selectByregion = document.querySelector('#selectByregion')


  selectByregion.addEventListener('change', (e)=> {

      const selectCountry = e.target.value 
    
      // filter  country be region
      const region = data.filter(country => {

        return country.region?.toLowerCase() === selectCountry.toLowerCase()
      })

      if(region.length === 0){
          console.log(`${selectByregion}`)
          return
      }

      region.sort((a,b)=>  a.name.common.localeCompare(b.name.common))


      console.log(`Countries in ${selectCountry}:`, region);


    renderCountry(region)


  })

    function renderCountry(countries){

      container.innerHTML = ''

      if(countries.length === 0){
        container.innerHTML = `<p>No countries found.</p>`;
        return;
      }

      countries.forEach(({flags,name,region,population,capital}) => {

        const html = `
            <div class="card">
                <img src="${flags.png}">
                <h2>${name.common}</h2>
                <p><strong>Population:</strong>${population.toLocaleString()}</p>
                <p><strong>Region:</strong>${region}</p>
                <p><strong>Capital:</strong>${capital ? capital[0] : 'No capital'}</p>
            </div>
        ` 
        container.innerHTML += html
       
    });
    }


  function filterCountryByName(searchTerm){

    const filtered = data.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

    return filtered

  }

  renderCountry(data)

  countryName.addEventListener('input', function(e){

    const search = e.target.value.trim()

    const result = filterCountryByName(search)

    renderCountry(result)


  })
    
}).catch(error => console.error(`Something went wrong please try again ${error}`))

