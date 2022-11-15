const squadBtn = document.querySelector('#theSquad')
const squadDiv = document.querySelector('#squad')
const joinSquadfrm = document.getElementById('jointhesquad')
const nameInput = document.getElementById('name')
const instagram = document.getElementById('username')
const radiobutton = document.getElementById('radiobutton')
const enhance = document.getElementById('enhance')
const callname = document.getElementById('callname')
const age = document.getElementById('age')
const pin = document.getElementById('pin')
const skier = document.getElementById('skier')
const snowboarder = document.getElementById('snowboarder')
const expert = document.getElementById('expert')
const intermediate =document.getElementById('intermediate')
const beginner = document.getElementById('beginner')
const squadStatsbtn = document.getElementById('squadStats')
const weathertestBtn = document.getElementById('weather')
const weatherDiv = document.getElementById('weatherdiv')
const weatherTable = document.getElementById('weatherWeek')
const weatherdates = document.getElementById('tr')
const temp = document.getElementById('temp')

function showSquad (){
axios
.get('http://localhost:6721/ski/inventory')
.then((res)=>{
    console.log(res.data)
    squadDiv.innerHTML=""
    for(let i =0; i<res.data.length; i++){
    createMemberCard(res.data[i]) 
    }
})
}

function createMemberCard (skiers){
    
   let skiCard = document.createElement('div')
   skiCard.innerHTML = `<h4>${skiers.callname}</h4>
     <ul>
        <li>Name: ${skiers.name}</li>
        <li>Age: ${skiers.age}</li>
        <li>Instagram: ${skiers.instagram}</li>
        <li>Mode: ${skiers.type}</li>
        <li> Ability Leve:${skiers.ability}</li>
        </ul>`
        squadDiv.appendChild(skiCard) 
    }

    function SquadStats (){
        axios.get('http://localhost:6721/ski/stats')
        .then(res=>{
            
            squadDiv.innerHTML=""

            let total = res.data[4].count + res.data[4].count + res.data[4].count 
            let expert = res.data[4].count * 3
            let intermediate = res.data[5].count * 2
            let beginner = res.data[6].count * 1

            let averageCalculator = (expert + intermediate + beginner)/total
            let averageAbility = "" 
            if (averageCalculator <= 1){
                averageAbility = "Beginner"
            }else if (averageCalculator >1 && averageCalculator <=2){
                averageAbility = "Intermediate"
            }else if (averageCalculator>2){
                averageAbility = "Expert"
            }

            let squadStatsCard = document.createElement('div')
            squadStatsCard.innerHTML = `
            <p>Average Age ${Math.ceil(res.data[0].averageage/10)*10}</p>
            <p>Skiers ${res.data[2].count}</p>
            <p>Snowboarders ${res.data[3].count}</p>
            <p>Average Ability ${averageAbility}</p>
            
            `
            squadDiv.appendChild(squadStatsCard) 
        })
    }

    function addSkier(e){
        e.preventDefault()
        console.log('buttonworks')
        type =""
        ability =""
        if (skier.checked){
            type = "skier"
        }else if(snowboarder.checked){
            type = "snowboarder"
        }
        if(expert.checked){
            ability = "Expert"
        }else if(intermediate.checked){
            ability = "Intermediate"
        }else if(beginner.checked){
            ability = "Beginner"
        }
        const body = {
            name: nameInput.value,
            instagram: instagram.value,
            callname: callname.value,
            type: type,
            enhancement: enhance.value,
            age: age.value,
            // pin: pin.value,
            ability: ability
        }
        console.log(body)
        axios.post("/addskier", body)
        .then(res =>{
            alert(res.data)
        })
        
    }

    function weather (){
        console.log('got to weatherfunction')
//this next part gets the token 
        username='devmountain_garry'
        password='2z9uWnaT8F'
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));


        fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
        }).then(function (resp) {
             return resp.json();
        }).then(function (data) {
            let token = data.access_token;
            console.log('token', token);
            getapiData(token)
        }).catch(function (err) {
            console.log('something went wrong', err);
        });
     
        function getapiData (token){
            let today = new Date().toISOString()
            const nextWeek = new Date()
            nextWeek.setDate(new Date().getDate() + 7)
            let nextWeekSring = nextWeek.toISOString()
            console.log(nextWeekSring)
            console.log(today)
            
            let url = today +"--" + nextWeekSring + ":PT12H/t_2m:F/46.0212076,7.749254/json?access_token=" + token
    
            axios.get('https://api.meteomatics.com/'+url)
            .then(res =>{
                console.log(res.data.data[0].coordinates[0].dates[0].date.substring(5,10))
                
                for (let i = 0; i < res.data.data[0].coordinates[0].dates.length; i++) {
                    let weatherdate = document.createElement('th')
                    if (i %2 === 0) {

                        weatherdate.innerHTML= `${res.data.data[0].coordinates[0].dates[i].date.substring(5,10)}`
                    }
                    let tempurature = document.createElement('td')
                    tempurature.innerHTML= `${res.data.data[0].coordinates[0].dates[i].value}`
                    weatherdates.appendChild(weatherdate)
                    temp.appendChild(tempurature)
                }
            })
        }
 

    }

// weather()

joinSquadfrm.addEventListener('submit', addSkier)
squadBtn.addEventListener('click', showSquad)
squadStatsbtn.addEventListener('click',SquadStats)


// <li>Ability Level:${skiers.abilityLevel}</li>
//<li>${skiers.bio}</li>




