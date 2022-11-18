require('dotenv').config()
const axios = require('axios')

const {
    METEOMATICS_API_PASSWORD,
    METEOMATICS_API_USERNAME
} = process.env

module.exports = {
    getWeather: (req, res) => {
        axios.get('https://login.meteomatics.com/api/v1/token', {
            auth: {
                username: METEOMATICS_API_USERNAME,
                password: METEOMATICS_API_PASSWORD
            }
        })
        .then(response => {
            let token = response.data.access_token
            getApiData(token)
        })
        .catch(err => {
            console.log('an error happened with the token-generating axios call:')
            console.log(err)
            res.sendStatus(500)
        })

        function getApiData(token) {
            let today = new Date().toISOString()
            let todayAtThreeAm = today.slice(0,11)+ "15:00:00.000Z"
            const nextWeek = new Date()
            nextWeek.setDate(new Date().getDate() + 7)
            let nextWeekSring = nextWeek.toISOString()

            let url = todayAtThreeAm +"--" + nextWeekSring + ":PT12H/t_2m:F/46.0212076,7.749254/json?access_token=" + token

            axios.get('https://api.meteomatics.com/' + url)
            .then(response => {
                let temperatureTimeList = response.data.data[0].coordinates[0].dates
                res.send(temperatureTimeList)
            })
            .catch(err => {
                console.log('an error happened with the weather-getting axios call:')
                console.log(err)
            })
        }
    }
}