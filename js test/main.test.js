/**
 * @jest-environment jsdom
 */
import { restCountries } from '../js/main';

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

test('restCountries fetches and processes data', async () => {
  document.body.innerHTML = `
    <div class="container"></div>
    <input id="countryName">
    <select id="selectByregion"></select>
    <button class="clear-btn"></button>
  `;

  await restCountries();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(document.querySelector('.container').innerHTML).toContain('Testland');
});
