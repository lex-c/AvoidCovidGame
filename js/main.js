let gmTime, incidentHappened

const body = document.querySelector('body')
const hmPg = document.getElementById('homePg')
const outPg = document.getElementById('outPg')
const spacePg = document.getElementById('spacePg')
const hmOutBtn = document.getElementById('hmOutBtn')
const tempOSBtn = document.getElementById('outSBtnTmp')
const tempOHmBtn = document.getElementById('outHBtnTmp')
const spcOutBtn = document.getElementById('spcOutBtn')

hmOutBtn.addEventListener('click', chngPage)
tempOSBtn.addEventListener('click', chngPage)
tempOHmBtn.addEventListener('click', chngPage)
spcOutBtn.addEventListener('click', chngPage)

function chngPage(e) {
    document.getElementById(e.target.classList[0]).style.setProperty('display', 'none')
    document.getElementById(e.target.classList[1]).style.setProperty('display', 'grid')
    if (e.target.classList[1] === 'outPg') return zombieInt = window.setInterval(genZombie, randomTime(500))
    window.clearInterval(zombieInt)
}


//HOME PAGE
const allHmDivs = document.querySelectorAll('.hm-pg-div')
const hmHealthEl = document.getElementById('hmHealth')
const hmMHlthEl = document.getElementById('hmMHlth')
const hmFoodEl = document.getElementById('hmFood')
const hmTimeEl = document.getElementById('hmTime')
const hmMoneyEl = document.getElementById('hmMoney')
const choicesEl = document.getElementById('choices')
const hmProtItemsEl = document.getElementById('hmProtItems')
const hmMedsEl = document.getElementById('hmMeds')
const hmOutDiv = document.getElementById('hmOutDiv')

function hmPgInit() {
    hmPgDispRender()
}

function hmPgDispRender() {
    hmHealthEl.innerHTML = `Health: ${player.health}`
    hmMHlthEl.innerHTML = `Mental Health: ${player.mHlth}`
    hmFoodEl.innerHTML = `Food: ${player.food}`
    gmTimeRender()
    hmMoneyEl.innerHTML = `Cash: $${player.money}`
    hmProtItemsEl.innerHTML = `notsure`
    hmMedsEl.innerHTML = `Meds: ${player.meds}`
}

let gmTimer = setInterval(upSecs, 6000)
function upSecs() {
    gmTime += 60
    gmTimeRender()
}

function gmTimeRender() {
    hmTimeEl.innerHTML = `${parseInt(gmTime / 3600) % 24}H  ${parseInt(gmTime / 60) % 60}M  <strong>${parseInt(gmTime / 86400)}D`
}


//out page 


let personSpace = document.getElementById('s35')
const rtBtn = document.getElementById('rtBtn')
const ltBtn = document.getElementById('ltBtn')
const upBtn = document.getElementById('upBtn')
const dnBtn = document.getElementById('dnBtn')
const allBtnsD = document.querySelector('.allbtnsdiv')
const allBtns = document.querySelectorAll('.divbtn')
const allStDivs = document.querySelectorAll('.st')
const ppUpD = document.querySelector('.popupdiv')
const ppUpRDiv = document.querySelector('#ppRDiv')

let zombieArr = []
let stIds = []
for (let value of allStDivs) stIds.push(value.id.slice(1))
let newSpaceStrArr, newSpaceId, zombieInt, rEHappened, stNode, stZNum

allBtnsD.addEventListener('click', showAndMove)
// allBtns.forEach(e => {
//     e.addEventListener('click', showAndMove)
// })

function showAndMove(e) {
    e.target.style.setProperty('opacity', '50%')
    setTimeout(e => e.target.style.setProperty('opacity', '10%'), 100, e)
    move(e)
}

function move(e) {
    const dir = e.target.classList[0]
    newSpaceStrArr = personSpace.className.split(' ')[0].split(',')
    if (dir === 'up') newSpaceId = [`${parseInt(newSpaceStrArr[0]) - 1}`, newSpaceStrArr[1]].join('')
    if (dir === 'dn') newSpaceId = [`${parseInt(newSpaceStrArr[0]) + 1}`, newSpaceStrArr[1]].join('')
    if (dir === 'lt') newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) - 1}`].join('')
    if (dir === 'rt') newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) + 1}`].join('')
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ''
    personSpace = getNodeOrNum(newSpaceId) || personSpace
    personSpace.innerHTML = icon
    checkIfInBlock()
}

function checkIfInBlock() {
    if (personSpace.id === 's25') setTimeout(switchPageIn, 5000)
}
//------------------------change if above
function switchPageIn () {
    if (personSpace.id === 's25') {
        const icon = personSpace.innerHTML
        personSpace.innerHTML = ''
        personSpace = document.getElementById('s35')
        personSpace.innerHTML = icon
        outPg.style.setProperty('display', 'none')
        hmPg.style.setProperty('display', 'grid')
    }
}

function genZombie() {
    window.clearInterval(zombieInt)
    const stIdsCopy = [...stIds]
    const personIndex = stIds.indexOf(getNodeOrNum(personSpace))
    stIds.splice(personIndex, 1)
    const randomStNum = stIds[Math.floor(Math.random() * stIds.length)]
    stIds = stIdsCopy
    const num1 = Math.abs(randomStNum.split('')[0])
    const num2 = Math.abs(randomStNum.split('')[1])
    const personNum1 = Math.abs(getNodeOrNum(personSpace).split('')[0])
    const personNum2 = Math.abs(getNodeOrNum(personSpace).split('')[1])
    if (Math.abs(num1 - personNum1) + Math.abs(num2 - personNum2) === 1 && getNodeOrNum(randomStNum)) {
        rEHappened = getRandInArr(RiskEvent.instances)
        console.log(randomStNum, getNodeOrNum(randomStNum))
        setRemoveZ(randomStNum, getNodeOrNum(randomStNum))
        allBtnsD.removeEventListener('click', showAndMove)
        // if (checkIfSurround()) return 
        popUpChoice(randomStNum)
        return
    }
    zombieInt = window.setInterval(genZombie, randomTime(500))
}

// function checkIfSurround() {
//     pSpcArr = personSpace.className.split(' ')[0].split(',')
//     dir1 = [`${parseInt(pSpcArr[0]) - 1}`, pSpcArr[1]].join('')
//     dir2 = [`${parseInt(pSpcArr[0]) + 1}`, pSpcArr[1]].join('')
//     dir3 = [pSpcArr[0], `${parseInt(pSpcArr[1]) - 1}`].join('')
//     dir4 = [pSpcArr[0], `${parseInt(pSpcArr[1]) + 1}`].join('')
//     console.log(!(getNodeOrNum(dir1) || getNodeOrNum(dir2) || getNodeOrNum(dir3) || getNodeOrNum(dir4))) return [dir1, dir2, dir3, dir4].filter(dir => document.querySelector(`.s${dir}`).innerHTML = `<i class="fas fa-universal-access"></i>`)
// }
function popUpChoice(zId) {
    const descripH = document.createElement('h2')
    descripH.innerHTML = `${rEHappened.descrip}`
    ppUpD.appendChild(descripH)
    const qH = document.createElement('h2')
    qH.innerHTML = `What would you like to do:`
    ppUpD.appendChild(qH)
    const optionsDiv = document.createElement('div')
    optionsDiv.setAttribute('class', 'optionsdiv')
    ppUpD.appendChild(optionsDiv)
    rEHappened.choicesPoss.forEach((e, i) => {
        const choiceEl = document.createElement('h3')
        choiceEl.innerHTML = `${e}`
        choiceEl.setAttribute('id', `c${i}`)
        choiceEl.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
        choiceEl.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
        optionsDiv.appendChild(choiceEl)
    })
    optionsDiv.addEventListener('click', (chcClick) => {
        if (chcClick.target.id === 'c0') walkAway(zId)
        if (chcClick.target.id === 'c1') {
            setRemoveZ(zId)
            player.expose(rEHappened)
        }
        if (chcClick.target.id === 'c2') console.log(`haven't set this up yet`)
        ppUpD.style.setProperty('display', 'none')
        ppUpD.innerHTML = ''
        return
    })
    ppUpD.style.setProperty('display', 'flex')
}

function walkAway(zId) {
    setTimeout(setRemoveZ, 11000, zId)
    popUpRRender(0)
}

// function popUpChsBet(spcsAround) {
//     const titleH = document.createElement('h2')
//     titleH.innerHTML = `You are surrounded 😥 You must choose between them. Unfair, but c'est la vie...`
//     ppUpD.appendChild(titleH)
//     const qH = document.createElement('h3')
//     qH.innerHTML = `Which One:`
//     ppUpD.appendChild(qH)
//     const optionsDiv = document.createElement('div')
//     optionsDiv.setAttribute('class', 'optionsdiv')
//     ppUpD.appendChild(optionsDiv)
//     spcsAround.forEach(spc => {
//         const descripH = document.createElement('h3')
//         descripH.innerHTML = `${zombieArr[spc].descrip}`
//         descripH.setAttribute('id', `z${spc}`)
//         descripH.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
//         descripH.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
//         optionsDiv.appendChild(descripH)
//     })
//     optionsDiv.addEventListener('click', (chcClick) => {
//         player.expose(zombieArr[parseInt(chcClick.target.id.slice(1))])
//         ppUpD.style.setProperty('display', 'none')
//         ppUpD.innerHTML = ''
//     })
//     ppUpD.style.setProperty('display', 'flex')
// }

function popUpRRender(which) {
    if (!which) ppUpRDiv.innerHTML = `okay, if that's your choice... you'll have to walk around then. This space will be blocked for a little.`
    if (which) ppUpRDiv.innerHTML = which
    setTimeout(() => {
        ppUpRDiv.style.setProperty('display', 'none')
        ppUpRDiv.innerHTML = ``
        allBtnsD.addEventListener('click', showAndMove)
        zombieInt = window.setInterval(genZombie, randomTime(500))
    }, 2000)
    ppUpRDiv.style.setProperty('display', 'flex')
}

//AFTER LAST PAGE

class Incident {
    constructor(descrip, type, exposAmnt, outSpreadP, inSpreadP) {
        this.descrip = descrip,
        this.type = type,
        this.exposAmnt = exposAmnt,
        this.outSpreadP = outSpreadP,
        this.inSpreadP = inSpreadP
    }
    get inOutSpreadP() {
        return [this.outSpreadP, null, this.inSpreadP]
    }
}
const cough = new Incident('coughed', 'vap', 20000, [70, 70, 70, 70, 20, 20, 20, 20, 10, 0], [95, 90, 80, 80, 80, 70, 70, 60, 50, 30])
const sneeze = new Incident('sneezed', 'vap', 5000, [90, 70, 50, 50, 30, 30, 20, 0, 0, 0], [90, 90, 80, 80, 60, 60, 60, 60, 60, 50])

class RiskEvent {
    constructor(name, descrip, choicesPoss, incidentsPoss, hitMessgs, someMessgs, missMessgs) {
        this.name = name,
        this.descrip = descrip,
        this.choicesPoss = choicesPoss,
        this.incidentsPoss = incidentsPoss,
        this.hitMessgs = hitMessgs,
        this.someMessgs = someMessgs,
        this.missMessgs = missMessgs
        RiskEvent.instances.push(this)
    }
    static instances = []
    get whichIncident() {
        let randNum = Math.random() * 100
        let balance = 0
        for (let value of this.incidentsPoss) {
            if (randNum >= balance && randNum < value.prob){
                incidentHappened = value.type
                return value.type
            }
            balance = value.prob
        }
        return 0
    }
    get hitMessage() {
        const mess = getRandInArr(this.hitMessgs).split(' ')
        mess.splice(1, 0, `${incidentHappened.descrip}`)
        return mess.join(' ')
    }
    get someMessage() {
        const mess = getRandInArr(this.someMessgs).split(' ')
        mess.splice(1, 0, `${incidentHappened.descrip}`)
        return mess.join(' ')
    }
    get missMessage() {
        return getRandInArr(this.missMessgs)
    }
    renderMessages(hitOrMiss) {
        if (!hitOrMiss) return this.missMessage
        if (hitOrMiss > 0.5) return this.hitMessage
        return this.someMessage
    }
}
const homelessMan1 = new RiskEvent(`homelessMan1`, 'A homeless man showed up in your path', [`avoid them`, `keep going`, 'put prot and kp going'], [{type: cough, prob: 20,}, {type: sneeze, prob: 30,}], [`He right in your face. Omg; it's so gross!`, `another hit messg`, `and a third hit messg`], [`He but he was facing away, hopefully you're okay 🤷‍♀️`], [`He didn't do anything; you're good; stop being so prejudiced!`])
const homelessWoman1 = new RiskEvent('homelessWoman1', 'A homeless woman is sitting in her blankets on the sidewalk', ['Move away; you hate the smell anyways', 'Put a dollar in her jar; you want to help', `Check your protective gear; you're not going in unprotected`], [{type: cough, prob: 20}, {type: sneeze, prob: 30}], [`She right on your chest. Ewwww...`], [`She but she covered her mouth`], [`She's just minding her own business. Way to freak out...`])


const player = {
    exposure: 0,
    context: -1,
    expose(riskEvent) {
        const incident = riskEvent.whichIncident
        if (!incident) return popUpRRender(`${renderCombinedMess([0, this.exposure / 5000], riskEvent)}`)
        const incidAmnt = incident.exposAmnt * getRandomDilute(incident.inOutSpreadP[this.context + 1])
        this.exposure += incidAmnt
        window.setTimeout(this.rvrsAfterTime.bind(player), 3000, incidAmnt)
        popUpRRender(`${renderCombinedMess([incidAmnt / incident.exposAmnt, this.exposure / 5000], riskEvent)}`)
        this.check()
    },
    rvrsAfterTime(amount) {
        this.exposure -= amount
    },
    // get player caution riskfactor
    check() {
        if (this.health === 0) return console.log('player health down')
        if (this.mHlth === 0) return console.log('player psych down')
        if (this.exposure >= 5000) return console.log('got it')
    }
}



function renderCombinedMess(incidAndTot, riskEvent) {
    const incidMess = riskEvent.renderMessages(incidAndTot[0])
    if (incidAndTot[0] === 0) return `${incidMess}`
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 1) return `${incidMess} but it was still enough...whop whop whop`
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 1) return `${incidMess} and it got you there. Congrats! You got it!`
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 0.7) return `${incidMess} but you're still close so...`
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 0.7) return `${incidMess} and you're close now. Life sucks and people are...`
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 0.4) return `${incidMess} and you only have some; you should be okay...`
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 0.4) return `${incidMess} and now you have some. You're still okay...`
    if (incidAndTot[0] <= 0.5) return `${incidMess} and you don't have much on you. Stop freaking out`
    if (incidAndTot[0] > 0.5) return `${incidMess} but you still don't have much. Calmes toi`
}


//----------------utility fxns----------------------------

function getNodeOrNum(numOrNode) {
    const val = isNaN(numOrNode) ? numOrNode.id.slice(1) : document.querySelector(`#s${numOrNode}`)
    return val
}

function setRemoveZ(zId, zNode) {
    if (!getNodeOrNum(zId)) {document.querySelector(`.s${zId}`).id = `s${zId}`; getNodeOrNum(zId).innerHTML = ''; zombieArr.splice(zId, 1); return}
    zNode.innerHTML = `<i class="fas fa-universal-access"></i>`; zNode.id = `ii${zId}`; zombieArr[zId] = rEHappened; return
}

function getRandInArr(arr) {return arr[Math.floor(Math.random() * arr.length)]}

function randomTime(timeBase) {
    const val = Math.floor(Math.random() * timeBase + 1)
    console.log('random time int', val)
    return val
}

function getRandomDilute(spread) {
    const randNum = Math.random() * 10
    return spread.reduce((a, e, i, arr) => {
        if (randNum < i + 1 && randNum >= i) {
            if (e === arr[i - 1]) i = arr.indexOf(e)
            const percentLeft = Math.random() * ((arr[i - 1] || 100) - e) + e
            return a = percentLeft / 100
        }
        return a = a
    }, 0)
}
//Init----------------------------------

function init() {
    player.health = 100
    player.mHlth = 100
    gmTime = 0
    player.money = 500
    player.food = 10
    player.meds = 7
    player.protItems = {}
    hmPgInit()
}

init()

// window.setTimeout(() => player.expose(oneRikIncident), 6000)
// window.setTimeout(() => player.expose(oneRiskIncident), 8000)
// window.setTimeout(() => player.expose(oneRiskIncident), 10000)
// window.setTimeout(() => player.expose(oneRiskIncident), 12000)
