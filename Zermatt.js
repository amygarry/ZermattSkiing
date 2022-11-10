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
        <li>instagram: ${skiers.instagram}</li>
        </ul>`
        squadDiv.appendChild(skiCard) 
    }

    function SquadStats (){
        axios.get('http://localhost:6721/ski/stats')
        .then(res=>{
            console.log(res.data)
        })
        
        // let squadStatCard = document.createElement('div')
        // squadStatsCard.innerHTML = `<h4>${skiers.callname}</h4>
        //   <ul>
        //      <li>Name: ${skiers.name}</li>
        //      <li>Age: ${skiers.age}</li>
        //      <li>instagram: ${skiers.instagram}</li>
        //      </ul>`
        //      squadDiv.appendChild(skiCard) 
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
            pin:pin.value,
            ability: ability
        }
        console.log(body)
        axios.post("/addskier", body)
        .then(res =>{
            alert(res.data)
        })
        
    }

joinSquadfrm.addEventListener('submit', addSkier)
squadBtn.addEventListener('click', showSquad)
squadStatsbtn.addEventListener('click',SquadStats)

// <li>Ability Level:${skiers.abilityLevel}</li>
//<li>${skiers.bio}</li>