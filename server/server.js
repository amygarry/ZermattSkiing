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
const {zermatthome, matterhornstyles, squadpic, weathermanpic } = require('./controllers/pageCtrl')
//these are functions so that the html and css are connected 
app.get("/", zermatthome)
app.get("/styles", matterhornstyles)
app.get("/spic", squadpic)
app.get("/weatherman", weathermanpic)

const{createSquadMember, getSquad, getAvgAge}= require('./controllers/dbcontroller.js')
app.post("/addskier", createSquadMember)


app.get('/ski/inventory', getSquad)
app.get('/ski/stats', getAvgAge)



const {PORT} = process.env

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})




// const skiers = [
//     {
//         name: 'Amy',
//         nickname: 'Queen of Diamonds',
//         abilityLevel: 'Expert',
//         age: 27,
//         instagram: "@aimzgarry",
//         bio:'Always looking for more technical terrain Amy loves to shred the blacks. She has dreamt of skiing the Swiss Alps for as long as she can remember.', 
//     },
//     {
//         name: 'Austin',
//         nickname: 'Bad Bunnie',
//         abilityLevel: 'Expert',
//         age: 23,
//         instagram: "@aus._.10",
//         bio: "Rips down anything and everything. If you put kicker or stump or cliff drop in front of him he'll send it. Is down to shred all day then hit the pubs at night."
//     }
// ]