const ATTACK_VALUE = 10
const MONSTER_ATTACK_VALUE = 14
const STRONG_ATTACK_VALUE = 17
const HEAL_VALUE = 20
const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK'
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK'
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL'
const LOG_EVENT_GAME_OVER = 'GAME_OVER'


const battleLog = []
const enteredValue = prompt('Maximum life for you and the monster', '100')

let chosenMaxLife = parseInt(enteredValue)
if(isNaN(chosenMaxLife || chosenMaxLife <= 0)) {
    chosenMaxLife = 100
}
let currentMonstersHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true

adjustHealthBars(chosenMaxLife)
 
function writeToLog (ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    } 
    switch(ev) {
        case ev === LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER'
            break;
        case ev === LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: ev,
                value: val,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            }
            break;
        case ev === LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            }
            break;
        case ev === LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            } 
            break;
        case ev === LOG_EVENT_GAME_OVER:
            logEntry = {
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            }   
            break;
            default:
                logEntry = {} ;
    }
    // if(ev === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = 'MONSTER'
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     }
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     }
    // } else if(ev === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     } 
    // } else if(ev === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     }      
    // }
    battleLog.push(logEntry)
}

function reset () {
currentMonstersHealth = chosenMaxLife
currentPlayerHealth = chosenMaxLife
resetGame(chosenMaxLife)
}
function endRound () {
    const initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
currentPlayerHealth -= playerDamage

writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonstersHealth, currentPlayerHealth)

if(currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false
    removeBonusLife()
    currentPlayerHealth = initialPlayerHealth
    setPlayerHealth(initialPlayerHealth)
    alert('You Would Be Dead But Your BonusLife Saved You!')
}
if(currentMonstersHealth <= 0 && currentPlayerHealth >= 0) {
    alert('You Won!')
    writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonstersHealth, currentPlayerHealth)
    reset()
} else if(currentPlayerHealth <= 0 && currentMonstersHealth >= 0) {
    alert ('You Lost!')
    writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonstersHealth, currentPlayerHealth)
    reset()
} else if (currentMonstersHealth === 0 && currentPlayerHealth === 0) {
    alert ('You Have A Draw!')
    writeToLog(LOG_EVENT_GAME_OVER, 'A DRAW', currentMonstersHealth, currentPlayerHealth)
    reset()
}
}

function attackMonster (mode) {
const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE
const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK
// if(mode === MODE_ATTACK) {
//     maxDamage = ATTACK_VALUE
//     logEvent = LOG_EVENT_PLAYER_ATTACK
// } else if (mode === MODE_STRONG_ATTACK){
//     maxDamage = STRONG_ATTACK_VALUE
//     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
// }
const damage = dealMonsterDamage(maxDamage)
currentMonstersHealth -= damage
writeToLog(logEvent, damage, currentMonstersHealth, currentPlayerHealth)
endRound()
}

function attackHandler () {
    attackMonster(MODE_ATTACK)
}

function strongAttackHandler () {
    attackMonster(MODE_STRONG_ATTACK)
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
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonstersHealth, currentPlayerHealth)
    endRound()
}

function printLogHandler () {
    // console.log(battleLog)
    // for (let i = 0; i < 3; i++) {
    //     console.log(i)
    // }

    // for(let miky = 0 ; miky < 8; miky++ ) {
    //     console.log(miky)
    // }

    // for (let i = 9; i > 0; i--) {
    //     console.log(i)
    // }

    // for (let i = 0; i < battleLog.length; i++) {
    //     console.log(battleLog[i])
    // }
    let i = 0
    for (const logEntry of battleLog) {
        console.log(logEntry)
        console.log(i)
        i++
    }
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click' , printLogHandler)