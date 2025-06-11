/*

fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages`).then(response => response.json())
.then(data => {

  //Dom elements  needed for display and filtering

  const container = document.querySelector('.container')
  const countryName = document.querySelector('#countryName')
  const selectByregion = document.querySelector('#selectByregion')
  const btnClear = document.querySelector('.clear-btn')
  let currentRegion = ''
  let currentSearch = ''


  btnClear.addEventListener('click', () => {
      countryName.value = ''
    currentSearch = ''
      applyFilter()
  })

  //When the user selects the region
  selectByregion.addEventListener('change', (e)=> {

    currentRegion = e.target.value

    applyFilter()
 
  })
  
  //When the user types in the search input
  countryName.addEventListener('input', (e)=>{
    currentSearch = e.target.value.trim().toLowerCase()

    applyFilter();
  })
  
  
  // Applies both region and name filters to the country list
  function applyFilter(){

     // Filter by name if user typed something
    let   filteredCountries = data;

    if(currentRegion && currentRegion !== 'All'){

       filteredCountries =  filteredCountries.filter(country => {
        return  country.region?.toLowerCase() === currentRegion.toLowerCase()
      })
    }

    //Filter by Name if the user type something
    if(currentSearch){

       filteredCountries =  filteredCountries.filter(country => (

        country.name.common.toLowerCase().includes(currentSearch)
      ))
    }

     filteredCountries.sort((a,b)=> a.name.common.localeCompare(b.name.common));


    if ( filteredCountries.length === 0) {
      console.log(`No countries found${currentRegion ? ` in ${currentRegion}` : ''}${currentSearch ? ` matching "${currentSearch}"` : ''}`);
    }

    renderCountry( filteredCountries)

  }

     // Renders the list of countries to the page

    function renderCountry(countries){

      container.innerHTML = ''

      if(countries.length === 0){
        container.innerHTML = '<p class="no__country">No countries found...</p>';
        return;
      }


      //Create a card for each country
      countries.forEach(({flags,name,region,population,capital}) => {

        const html = `
        <a href="country.html?name=${encodeURIComponent(name.common)}" class="card-link">
          <div class="card">
              <img src="${flags.png}" alt="${name.common} flag">
              <h3>${name.common}</h3>
              <p>Population: <strong>${population.toLocaleString()} </strong></p>
              <p>Region:<strong> ${region}</strong></p>
              <p>Capital:<strong> ${capital ? capital[0] : 'No capital'}</strong></p>
           </div>
        </a>
        ` 
        container.innerHTML += html
       
    });
    }

 

  renderCountry(data)
  
    
}).catch(error => console.error(`Something went wrong please try again ${error}`))

/////
*/


async function restCountries(){

  try{

    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages`)
    
    const data = await response.json();


    const container = document.querySelector('.container')
    const countryName = document.querySelector('#countryName')
    const btnClear = document.querySelector('.clear-btn')
    const selectByregion = document.querySelector('#selectByregion')


    function renderCountry(country){

      container.innerHTML = ''

      if(country.length === 0){
          container.innerHTML = '<p class="no__country">No countries found...</p>';
          return;
      }
      
      

    }

    data.forEach(({flags,name, region,population,capital}) =>{

        const html = `
               <a href="country.html?name=${encodeURIComponent(name.common)}" class="card-link">
          <div class="card">
              <img src="${flags.png}" alt="${name.common} flag">
              <h3>${name.common}</h3>
              <p>Population: <strong>${population.toLocaleString()} </strong></p>
              <p>Region:<strong> ${region}</strong></p>
              <p>Capital:<strong> ${capital ? capital[0] : 'No capital'}</strong></p>
           </div>
        </a>
        `

        container.innerHTML += html
    })

  } catch(error){
      console.error(`Something went wrong please try again ${error}`)
  }
}

restCountries()