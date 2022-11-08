//FUNCTIONS THAT ARE RELATED TO THE DATABASE 
//  required to be able to run
require('dotenv').config()
//The link to my database is private and saved in the .env folder. 
// This line of code is to destructure the link
const {DATABASE_URL}=process.env

//THis is to be able to use sequelize. 
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    } 
})

module.exports = {
    createSquadMember: (req, res)=>{
        let {name, instagram, callname, type, enhancement, age, pin} = req.body
        console.log("got to line 23")
        sequelize.query(`
        INSERT INTO skisquad (name, instagram, callname, type, age, enhancement, pin)
        VALUES ('${name}', '${instagram}', '${callname}', '${type}',${age},'${enhancement}', ${pin})
        `)
        .then(dbres=>{
            res.send(`${name} was added to the squad`)
        })
    }
}


// CREATE TABLE skisquad (
//     skier_id SERIAL PRIMARY KEY, 
//     name VARCHAR, 
//     instagram VARCHAR,
//     bio VARCHAR,
//     enhancement VARCHAR
//     );