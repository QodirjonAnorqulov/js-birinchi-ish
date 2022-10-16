const api ={
    key:'b10d789e7efc10adda9643d83300d1cb',
    baseurl:'https://api.openweathermap.org/data/2.5/',
};


const searchebox =document.querySelector('.search-box');

searchebox.addEventListener('keypress',setQuery)
function setQuery (e){
    if(e.keyCode == 13){
        getResults(searchebox.value);
        console.log(searchebox.value);
    }
}
function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather)=>{
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather){
    // console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerHTML= `${weather.name}, ${weather.sys.country}`
    let now = new Date()
    let date = document.querySelector(".location .date")
    date.innerHTML =dateBuilder(now)
    let temp =document.querySelector(".temp")
    temp.innerHTML=`${Math.round(weather.main.temp) }<span>°c</span>`;
    console.log(temp);
    let weatherel =document.querySelector(".weather")
    weatherel.innerHTML=weather.weather[0].main
    let hilow =document.querySelector(".hi-low")
    hilow.innerHTML=`${Math.round(weather.main.temp_min)} °c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(q){
    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","wednesday","Thursday","Friday","Saturday"]
    let day =days[q.getDay()];
    let date =q.getDate();
    let month = months[q.getMonth()];
    let year =q.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}
