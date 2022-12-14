//this is here to get all of the node packages that I need 
const express = require("express")
const cors = require("cors")
require('dotenv').config()

//This is here to turn express into a variable app 
const app = express()

app.use(express.json())
app.use(cors())

//this is going to serve my script to the front page so my front end js works 
const {scriptServer}= require("./controllers/pageCtrl.js")
app.get("/js", scriptServer)

//These are destructuring the funcions from the pageCtrl
const {zermatthome, matterhornstyles, squadpic, weathermanpic, ashamypic, logopic} = require('./controllers/pageCtrl')
//these are functions so that the html and css are connected 
app.get("/", zermatthome)
app.get("/styles", matterhornstyles)
app.get("/spic", squadpic)
app.get("/weatherman", weathermanpic)
app.get("/Ashamy", ashamypic)
app.get("/logo", logopic)

const{createSquadMember, getSquad, getAvgAge}= require('./controllers/dbcontroller.js')
app.post("/addskier", createSquadMember)


app.get('/ski/inventory', getSquad)
app.get('/ski/stats', getAvgAge)

const {getWeather}= require('./controllers/apicontroller.js')
app.get('/weather', getWeather)


const {PORT} = process.env

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})


