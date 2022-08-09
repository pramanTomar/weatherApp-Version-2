const inputCity = document.getElementById('inputCityName');
const searchBtn = document.getElementById('searchBtn');
const topRowBox = document.getElementById('topRowBox');
const errorMsgBox = document.getElementById("errorMsgBox");
const outputBoxContainer = document.getElementById("outputBoxContainer")

const getDetails = async ()=>{
    const inputCityName = inputCity.value;
    if(inputCityName == ""){
        outputBoxContainer.style = "display:none;";
        errorMsgBox.innerText = "Plz Enter a City Name To Search.";
        errorMsgBox.style = "display:block;";
    }else{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&units=metric&appid=a116fac853a2ad687e4d943ec401e8c7`;
        const res = await fetch(url);
        
        const apiOutputObj = await res.json();
        const apiOutput = [apiOutputObj];
        console.log(apiOutput);

        if(apiOutput[0].cod == 404){
            outputBoxContainer.style.display = "none";
            errorMsgBox.innerText = "Kindly Check City Name/Spelling Once Again And Then Try Again.";
            errorMsgBox.style = "display:block;";
        }else{
            

            // main details updated here


            const cityName = apiOutput[0].name;
            console.log(cityName);
            const country = apiOutput[0].sys.country;
            const temp = apiOutput[0].main.temp;
            const wind_speed = apiOutput[0].wind.speed;
            const minTemp = apiOutput[0].main.temp_min;
            const maxTemp = apiOutput[0].main.temp_max;
            const humidity = apiOutput[0].main.humidity;
            const feels_like = apiOutput[0].main.feels_like;
            const weather_nature = apiOutput[0].weather[0].main;

            const dateObj = new Date();

            let Today = document.getElementById('Today');

            let days = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thur",
                "Fri",
                "Sat"
            ];

            let months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec"
            ]

            let day = days[dateObj.getDay()];
            let month = months[dateObj.getMonth()];

            let date = dateObj.getDate();

            let hours = dateObj.getHours();
            let min = dateObj.getMinutes();
            let amPm = 'AM';


            if(hours>11){
                amPm = 'PM';
                if(hours>12){
                    hours -= 12;
                }
            }
            if(min<10){
                min = '0'+min;
            }

            // updating in markup
            const city_name = document.getElementById("cityName");
            city_name.innerText = `${cityName}, ${country}`;

            const date_val = document.getElementById('date');
            date_val.innerHTML = `${day}, ${date} ${month}`

            time.innerText = `${hours}:${min} ${amPm}`

            temp_val.innerText = temp;

            min_temp.innerText = minTemp;
            max_temp.innerText = maxTemp;
            hum_val.innerText = humidity;
            feels_like_val.innerText = wind_speed;


            const weatherCond = apiOutput[0].weather[0].main;

            const weatherCondImg = document.getElementById("weatherCondImg");

            if(weatherCond == "Thunderstorm"){
                weatherCondImg.src = "images/icons/storm.gif";
            }else if(weatherCond == "Rain"){
                weatherCondImg.src = "images/icons/rain.gif";
            }else if(weatherCond == "Snow"){
                weatherCondImg.src = "images/icons/snow.gif";
            }else if(weatherCond == "Mist" || weatherCond == "Haze" || weatherCond == "Dust"){
                weatherCondImg.src = "images/icons/foggy.gif";
            }else if(weatherCond == "Fog"){
                weatherCondImg.src = "images/icons/foggy.gif";
            }else if(weatherCond == "Clear"){
                weatherCondImg.src = "images/icons/sun.gif";
            }else if(weatherCond == "Clouds"){
                weatherCondImg.src = "images/icons/cloudy.gif";
            }else{
                weatherCondImg.src = "images/icons/sun.gif";
            }

            errorMsgBox.style = "display:none;";
            outputBoxContainer.style = "display:block;";
        }
    }
}

searchBtn.addEventListener('click', getDetails);
searchBtn.addEventListener('keypress', getDetails);



