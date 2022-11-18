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
        let {name, instagram, callname, type, enhancement, age, pin, ability} = req.body
        sequelize.query(`
        INSERT INTO skisquad (name, instagram, callname, type, age, enhancement, ability)
        VALUES ('${name}', '${instagram}', '${callname}', '${type}',${age},'${enhancement}', '${ability}')
        `)
        .then(dbres=>{
            res.send(`${name} was added to the squad`)
        })
    },

    getSquad: (req,res)=>{
        sequelize.query(`
        SELECT * FROM skisquad
        `)
        .then(dbres=>{
            res.send(dbres[0])
        })
    },

    getAvgAge: (req,res)=>{
       
        sequelize.query(`
        SELECT AVG(age) AS AverageAge FROM skisquad;
        
        SELECT type, count(*)
        from skisquad 
        group by type; 

        SELECT ability, count(*)
        from skisquad 
        group by ability; 

        SELECT *  
        FROM skisquad;
        
        `)
        .then(dbres=>{
            res.send(dbres[0])
        })
    }

}