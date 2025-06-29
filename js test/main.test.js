import { restCountries } from '../js/main';
// Mock global do fetch para simular resposta da API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([ 
      { 
        name: { common: 'Testland' }, 
        region: 'Europe', 
        population: 1000, 
        capital: ['Test City'], 
        flags: { png: 'test.png' } 
      }
    ])
  })
);

describe('restCountries', () => {
  beforeEach(() => {
    // Prepara o DOM simulado antes de cada teste
    document.body.innerHTML = `
      <div class="container"></div>
      <input id="countryName">
      <select id="selectByregion"></select>
      <button class="clear-btn"></button>
    `;
  });

  test('fetches data and renders country info', async () => {
    await restCountries(); // executa a função

    
    expect(fetch).toHaveBeenCalledTimes(1);

    // Verifica se a URL da API foi chamada corretamente
    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages'
    );

    // Verifica se o país retornado foi adicionado ao DOM
    expect(document.querySelector('.container').innerHTML).toContain('Testland');
  });

  test('handles fetch failure gracefully', async () => {
    // Faz o fetch simular uma falha
    fetch.mockImplementationOnce(() => Promise.reject('API failure'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await restCountries();

    // Verifica se o erro foi capturado e logado
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Something went wrong, please try again:')
    );

    consoleSpy.mockRestore(); // Restaura o console original
  });
});
