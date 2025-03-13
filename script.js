const countryContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn');
// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(JSON.stringify(request.responseText));
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `<article class="country">
//           <img class="country_img" src="${data.flags.png}" alt="${
//       data.flags.alt
//     }" />
//           <div class="country_data">
//             <h3 class="country_name">${data.altSpellings[1]}</h3>
//             <p class="country_region">${data.region}</p>
//             <p class="country_capital">${data.capital}</p>
//             <p class="country_row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M</p>
//             <p class="country_row"><span>🗣️</span>${
//               Object.values(data.languages)[0]
//             }</p>
//             <p class="country_row"><span>💰</span>${
//               Object.values(data.currencies)[0].name
//             }</p>
//           </div>
//         </article>`;

//     countryContainer.insertAdjacentHTML('beforeend', html);
//     countryContainer.style.opacity = 1;
//   });
// };

// getCountry('india');
// getCountry('portugal');
// getCountry('china');
// getCountry('Russia');
// getCountry('Senegal');

const renderCountry = function (data, classsName = '') {
  const html = `<article class="country ${classsName}">
          <img class="country_img" src="${data.flags.png}" alt="${
    data.flags.alt
  }" />
          <div class="country_data ">
            <h3 class="country_name">${data.altSpellings[0]}</h3>
            <p class="country_region">${data.region}</p>
            <p class="country_capital">${data.capital}</p>
            <p class="country_row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country_row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country_row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

  countryContainer.insertAdjacentHTML('beforeend', html);
  countryContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // console.log(JSON.stringify(request.responseText));
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     const neighbours = Object.values(data.borders);
//     console.log(neighbours);

//     neighbours.forEach(neighbour => {
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       request2.send();
//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, 'neighbour');
//       });
//     });
//   });
// };
// getCountryAndNeighbour('india');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbours = data[0].borders[0];
//       if (!neighbours) return;
//       console.log(neighbours);
//       // Handle all neighbor fetches using Promise.all

//       fetch(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`)
//         .then(res => res.json())
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//           console.error(`${err} ....`);
//           alert(err);
//         })
//         .finally(() => console.log('always executed'));

//       // Wait for all neighbor requests to finish
//     })
//     .catch(err => {
//       console.log(err);
//       alert(err.message);
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

//helper funtion
const getJSON = function (url, errorMsg = 'Something went wrong ') {
  return fetch(url).then(res => {
    console.log(res);
    if (!res.ok) throw new Error(`${errorMsg} ${res.status}`);
    return res.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
      const [neighbours] = data[0].borders;
      console.log(neighbours);

      if (!neighbours) throw new Error('no neighbour found');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbours}`,
        'neighbour is not defined'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      alert(err.message);
    })
    .finally(() => console.log('always executed'));
};

// btn.addEventListener('click', function () {
//   getCountryData('pk');
// });

//multiple apis ....fetch country by using latlng
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data); // Here you get the parsed JSON result
      console.log(`You are in ${data.city}, ${data.country}” `);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error('probleme with geocoding');
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
