const ATTACK_VALUE = 10
const MONSTER_ATTACK_VALUE = 14
const STRONG_ATTACK_VALUE = 17
const HEAL_VALUE = 20

let chosenMaxLife = 100
let currentMonstersHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true

adjustHealthBars(chosenMaxLife)

function reset () {
currentMonstersHealth = chosenMaxLife
currentPlayerHealth = chosenMaxLife
resetGame(chosenMaxLife)
}
function endRound () {
    const initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
currentPlayerHealth -= playerDamage
if(currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false
    removeBonusLife()
    currentPlayerHealth = initialPlayerHealth
    setPlayerHealth(initialPlayerHealth)
    alert('You Would Be Dead But Your BonusLife Saved You!')
}
if(currentMonstersHealth <= 0 && currentPlayerHealth >= 0) {
    alert('You Won!')
    reset()
} else if(currentPlayerHealth <= 0 && currentMonstersHealth >= 0) {
    alert ('You Lost!')
    reset()
} else if (currentMonstersHealth === 0 && currentPlayerHealth === 0) {
    alert ('You Have A Draw!')
    reset()
}
}

function attackMonster (mode) {
let maxDamage
if(mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE
} else if (mode === 'STRONG_ATTACK'){
    maxDamage = STRONG_ATTACK_VALUE
}
const damage = dealMonsterDamage(maxDamage)
currentMonstersHealth -= damage
endRound()
}

function attackHandler () {
    attackMonster('ATTACK')
}

function strongAttackHandler () {
    attackMonster('STRONG_ATTACK')
}

function healPlayerHandler () {
    let healValue
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You Can't Heal To More Than Your Initial Health!")
        healValue = chosenMaxLife - currentPlayerHealth
    } else {
        healValue = HEAL_VALUE
    }

    increasePlayerHealth(healValue)
    currentPlayerHealth += healValue
    endRound()
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)