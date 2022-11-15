//PAGE CONTROLLERS 
//necessary so that I can use the package 
const path =require ("path")

// a list of functions that are going to to connect my html and my css and my pictures so that they work when deployed or on live server 
module.exports = {
    zermatthome: (req,res)=>{
        res.sendFile(path.join(__dirname, "../../ZermattSkiing.html"))
    },
    matterhornstyles: (req, res)=>{
        res.sendFile(path.join(__dirname, "../../MatterhornStyles.css"))
    },
    squadpic: (req, res) => {
        res.sendFile(path.join(__dirname, "../../IMG_2596.JPG"))
    },

    weathermanpic:  (req, res) => {
        res.sendFile(path.join(__dirname, "../../weatherman.JPG"))
    },

    ashamypic:  (req, res) => {
        res.sendFile(path.join(__dirname, "../../Ashamy.JPG"))
    },

    scriptServer : (req,res)=>{
        res.sendFile(path.join(__dirname,"../../Zermatt.js" ))
    }
}