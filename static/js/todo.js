var checkbtn = document.getElementById('form');
var check = document.getElementById('input');
var city = document.getElementById('city');
var state = document.getElementById('stateM');
var temperature =  document.getElementById('Temperture');
var climate = document.getElementById('climate');
var images = document.getElementById('img');
var show = document.getElementById('climate-detect');


var place = ""
check.addEventListener('input',(e)=>{
    place = e.target.value
    console.log(place)
 })
checkbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(place)
    fetch('https://localhost:3000/weather?location1='+place).then((response)=>{
        response.json().then((data)=>{
            if(data.error){console.log(data.error)}
            else{
                show.style.display="block";
                images.src=data.current.weather_icons[0];
                city.textContent= data.location.name;
                state.textContent=data.location.region+", "+data.location.country;
                temperature.textContent="Temperature: "+data.current.temperature+"*C";
                climate.textContent="Climate: "+data.current.weather_descriptions[0];
                document.querySelector('#timezone').textContent="TimeZone: "+data.location.timezone_id;   
            }
            });
        });});
            


var inputbox = document.getElementById('exampleFormControlInput1');
var currentinput = '';
inputbox.addEventListener('input',function(e){
    currentinput = e.target.value;
});

var btnAdd = document.getElementById('#add');
btnAdd.addEventListener('click',function(){
    
    if(currentinput==null || currentinput==undefined || currentinput==""){
        alert('Please Enter your task');
    }
});

var contactEmailButton = document.getElementById('emailButton');
contactEmailButton.addEventListener('click',()=>{
    alert("Your response has been conveyed.You will be contacted back soon!!!")
})

