const DOM = (() => {
    const cityInput = document.getElementById('city');
    cityInput.value = 'Fresno';
    const searchButton = document.getElementById('search');
    const cityTitle = document.querySelector('.city-title');
    const temp = document.querySelector('.temp');
    const celciusCheck = document.querySelector('.celcius');
    const condition = document.querySelector('.condition');
    const humidity = document.querySelector('.humidity');
    const uv = document.querySelector('.uv');
    const main = document.querySelector('.main');
    let data;

    async function GetWeather() {
            let city = cityInput.value;
            let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a3130a78a66b4f4281e220844233107&q=${city}`, {mode: 'cors'});
            data = await response.json();
            console.log(data);
            updateMain();
    }

    const updateMain = () => {
        updateCity();
        updateTemp();
        updateCondition();
        updateHumidity();
        updateUV();
    }

    const updateCity = () => {
        cityTitle.innerHTML = `${data.location.name}, ${data.location.region}`;
    }

    const updateTemp = () => {
        if(celciusCheck.checked) temp.innerHTML = `${data.current.temp_c}° C` ;
        else temp.innerHTML =  `${data.current.temp_f}° F`;
    }

    const updateHumidity = () => {
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    }

    const updateUV = () => {
        uv.innerHTML = `UV Index: ${data.current.uv}`;
    }

    const updateBackground = (day, con) => {
        if(con == "Clear" && day == 1) main.style.backgroundImage = "url('images/clear.jpg')";
        if(con == "Clear" && day == 0) main.style.backgroundImage = "url('images/nightclear.jpg')";
        if(con == "Partly cloudy" && day == 1) main.style.backgroundImage = "url('images/partlycloudy.gif')";
        if(con == "Partly cloudy" && day == 0) main.style.backgroundImage = "url('images/darkpartlycloudy.jpg')";
        if(con == "Sunny") main.style.backgroundImage = "url('images/sunny.webp')";
        if(con == "Overcast") main.style.backgroundImage = "url('images/overcast.gif')";
         if(con == "Fog") main.style.backgroundImage = "url('images/fog.gif')"
        if(con.includes("rain") || con.includes("drizzle")) { 
            main.style.backgroundImage = "url('images/rain.gif')";
            main.style.color = 'black';
        }
        if(con.includes("snow") || con.includes("sleet") || con.includes("ice")) {
            main.style.backgroundImage = "url('images/sunny.webp')";
        }
       
    }

    const updateCondition = () => {
        let con = data.current.condition.text;
        let day = data.current.is_day;
        condition.innerHTML = `${con}`;
        main.style.color = 'white';
        updateBackground(day, con);
    }

    searchButton.addEventListener('click', GetWeather);

    return{GetWeather};
})();

DOM.GetWeather();