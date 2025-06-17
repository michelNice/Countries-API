const { getCountryDetails } = require("../js/countryDetail");
// no lugar de export
module.exports = { getCountryDetails };


beforeEach(() => {
  global.fetch = jest.fn();
});

test('retorna os dados do país corretamente', async () => {
  const mockCountryData = [{
    name: {
      common: 'Brasil',
    },
    capital: ['Brasília'],
    population: 211000000,
  }];

  fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockCountryData),
  });

  const country = await getCountryDetails('Brasil');

  expect(country.name.common).toBe('Brasil');
  expect(country.capital[0]).toBe('Brasília');
  expect(country.population).toBe(211000000);
});

test('lança erro quando a API falha', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 404,
  });

  await expect(getCountryDetails('PaísInexistente'))
    .rejects
    .toThrow('Failed to fetch PaísInexistente (HTTP 404)');
});
n