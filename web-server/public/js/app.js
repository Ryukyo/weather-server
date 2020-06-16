//console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error) {
                messageOne.textContent = '';
                messageTwo.textContent = `${weatherData.error}`;
            } else {
                messageOne.textContent = `${weatherData.location}`;
                messageTwo.textContent = `${weatherData.forecast}`;
            }
        }) 
    });
})
