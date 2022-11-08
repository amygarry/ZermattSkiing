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




function showSquad (){
axios
.get('http://localhost:4000/ski/inventory')
.then((res)=>{
    console.log(res)
    for(let i =0; i<res.data.length; i++){
    createMember(res.data[i]) 
    }
})
}

function createMember (skiers){
   let skiCard = document.createElement('div')
   skiCard.innerHTML = `<h4>${skiers.nickname}</h4>
     <ul>
        <li>Name: ${skiers.name}</li>
        <li>Ability Level:${skiers.abilityLevel}</li>
        <li>Age: ${skiers.age}</li>
        <li>instagram: ${skiers.instagram}</li>
        <li>${skiers.bio}</li>
        </ul>`
        squadDiv.appendChild(skiCard) 
    }

    function addSkier(e){
        e.preventDefault()
        console.log('buttonworks')
        type =""
        if (skier.checked){
            type = "skier"
        }else if(snowboarder.checked){
            type = "snowboarder"
        }
        const body = {
            name: nameInput.value,
            instagram: instagram.value,
            callname: callname.value,
            type: type,
            enhancement: enhance.value,
            age: age.value,
            pin:pin.value
        }
        console.log(body)
        axios.post("/addskier", body)
        .then(res =>{
            alert(res.data)
        })
        
    }

joinSquadfrm.addEventListener('submit', addSkier)
squadBtn.addEventListener('click', showSquad)