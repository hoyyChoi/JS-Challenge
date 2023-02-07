const apikey = "53004077073f969526a1f51fbeaa75b8";


const main = document.getElementById('main')

const form = document.getElementById('form')

const search = document.getElementById('search')

const body  = document.getElementById('body')

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`

async function getWeatherByLocation(location){
    try {
        const resp = await fetch(url(location),{origin:"cors"})
        const respData = await resp.json()
        console.log(respData,KtoC(respData.main.temp))
        addWeatherTopage(respData)
      } catch (e) {
        alert(`${location}이란 이름의 도시는 없습니다.`);
      }
}



function addWeatherTopage(data){
    const temp = KtoC(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')

    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${temp}℃ <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    `

    main.appendChild(weather)
}


function KtoC(k){
    return Math.floor(k - 273.15);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    if(location){
        getWeatherByLocation(location)
    }

})