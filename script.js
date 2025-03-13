const countryContainer = document.querySelector('.countries');
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(JSON.stringify(request.responseText));
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `<article class="country">
          <img class="country_img" src="${data.flags.png}" alt="${
      data.flags.alt
    }" />
          <div class="country_data">
            <h3 class="country_name">${data.altSpellings[1]}</h3>
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

    countryContainer.insertAdjacentHTML('afterbegin', html);
    countryContainer.style.opacity = 1;
  });
};

getCountry('india');
