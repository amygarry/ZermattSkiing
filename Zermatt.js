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
const highs = document.getElementById('highs')
const lows = document.getElementById('lows')


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
// document.querySelector(".flexy").style.height ="auto"
}

function createMemberCard (skiers){
    
   let skiCard = document.createElement('div')
   skiCard.innerHTML = `
    <div class="infofrombtn">
        <h4 id ="callnames">${skiers.callname}</h4>
            <ul class ="skier-info">
                <li>Name: ${skiers.name}</li>
                <li>Age: ${skiers.age}</li>
                <li>Instagram: ${skiers.instagram}</li>
                <li>Mode: ${skiers.type}</li>
                <li> Ability Leve:${skiers.ability}</li>
            </ul>
    </div>`
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
            <div class="infofrombtn stats">
                <p>Average Age: ${Math.ceil(res.data[0].averageage/10)*10}</p>
                <p>Skiers: ${res.data[2].count}</p>
                <p>Snowboarders: ${res.data[3].count}</p>
                <p>Average Ability: ${averageAbility}</p>
            </div>
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

        axios.get('/weather')
        .then(res => {
            let temperatureTimeList = res.data

            for (let i = 0; i < temperatureTimeList.length; i++) {
                let weatherdate = document.createElement('th')
                let lowTemp = document.createElement('td')
                let highTemp = document.createElement('td')
                if (i %2 === 0) {

                    weatherdate.innerHTML= `${temperatureTimeList[i].date.substring(5,10)}`

                    highTemp.innerHTML= `${temperatureTimeList[i].value}`

                    highs.appendChild(highTemp)
                    weatherdates.appendChild(weatherdate)
                }else {
                    lowTemp.innerHTML= `${temperatureTimeList[i].value}`
                    lows.appendChild(lowTemp)
                }
            }
        })
        .catch(err => {
            console.log('error happened:')
            console.log(err)
        })
    }

weather()

joinSquadfrm.addEventListener('submit', addSkier)
squadBtn.addEventListener('click', showSquad)
squadStatsbtn.addEventListener('click',SquadStats)





