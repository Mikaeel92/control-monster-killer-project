const ATTACK_VALUE = 10

let chosenMaxLife = 100
let currentMonstersHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife)

function attackHandler () {
    const damage = dealMonsterDamage(ATTACK_VALUE)
    currentMonstersHealth -= damage
}

attackBtn.addEventListener('click', attackHandler)