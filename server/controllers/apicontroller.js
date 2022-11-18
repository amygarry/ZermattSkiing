require('dotenv').config()

module.exports = {
    getWeather: (req, res) => {
        console.log('doing getWeather')
        res.sendStatus(200)
    }
}