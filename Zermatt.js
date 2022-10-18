const squadBtn = document.querySelector('#theSquad')
const squadDiv = document.querySelector('#squad')


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


squadBtn.addEventListener('click', showSquad)