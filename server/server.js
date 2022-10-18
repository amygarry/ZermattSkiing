const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const skiers = [
    {
        name: 'Amy',
        nickname: 'Queen of Diamonds',
        abilityLevel: 'Expert',
        age: 27,
        instagram: "@aimzgarry",
        bio:'Always looking for more technical terrain Amy loves to shred the blacks. She has dreamt of skiing the Swiss Alps for as long as she can remember.', 
    },
    {
        name: 'Austin',
        nickname: 'Bad Bunnie',
        abilityLevel: 'Expert',
        age: 23,
        instagram: "@aus._.10",
        bio: "Rips down anything and everything. If you put kicker or stump or cliff drop in front of him he'll send it. Is down to shred all day then hit the pubs at night."
    }
]

app.get('/ski/inventory', (req, res) =>{
    res.status(200).send(skiers)

})

app.listen(4000,()=>{
    console.log("server is running on 4000")
})




