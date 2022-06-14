console.log('HELLO FROM JS')



const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data[0].location
                messageTwo.textContent = 'The temperature is currently ' + data[0].forecast.temperature
                    + ' degrees and it feeels like ' + data[0].forecast.feels_like + ' degrees.'
            }
        })
    })


})