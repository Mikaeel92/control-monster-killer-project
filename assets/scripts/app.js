const ATTACK_VALUE = 10
const MONSTER_ATTACK_VALUE = 14

let chosenMaxLife = 100
let currentMonstersHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife)

function attackHandler () {
    const damage = dealMonsterDamage(ATTACK_VALUE)
    currentMonstersHealth -= damage
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage
    if(currentMonstersHealth <= 0 && currentPlayerHealth >= 0) {
        alert('You Won!')
    } else if(currentPlayerHealth <= 0 && currentMonstersHealth >= 0) {
        alert ('You Lost!')
    } else if (currentMonstersHealth === 0 && currentPlayerHealth === 0) {
        alert ('You Have A Draw!')
    }
}


attackBtn.addEventListener('click', attackHandler)