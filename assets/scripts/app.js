const ATTACK_VALUE = 10
const MONSTER_ATTACK_VALUE = 14
const STRONG_ATTACK_VALUE = 17

let chosenMaxLife = 100
let currentMonstersHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife)

function attackMonster (mode) {
let maxDamage
if(mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE
} else if (mode === 'STRONG_ATTACK'){
    maxDamage = STRONG_ATTACK_VALUE
}
const damage = dealMonsterDamage(maxDamage)
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

function attackHandler () {
    attackMonster('ATTACK')
}

function strongAttackHandler () {
    attackMonster('STRONG_ATTACK')
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)