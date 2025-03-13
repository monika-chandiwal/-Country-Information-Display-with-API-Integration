const countryContainer = document.querySelector('.countries');
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

const getCountryAndNeighbour = function (country) {
  // console.log(JSON.stringify(request.responseText));
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    const neighbours = Object.values(data.borders);
    console.log(neighbours);

    neighbours.forEach(neighbour => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};
getCountryAndNeighbour('india');
