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


const startingSpace = document.getElementById('s35')
const rtBtn = document.getElementById('rtBtn')
const ltBtn = document.getElementById('ltBtn')
const upBtn = document.getElementById('upBtn')
const dnBtn = document.getElementById('dnBtn')
const allBtnsD = document.querySelector('.allbtnsdiv')
const allBtns = document.querySelectorAll('.divbtn')


let personSpace = startingSpace
let movingTimeout


allBtns.forEach(e => {
    e.addEventListener('click', showAndMove)
})

function showAndMove(e) {
    e.target.style.setProperty('opacity', '50%')
    setTimeout(e => e.target.style.setProperty('opacity', '10%'), 100, e)
    move(e)
}

function move(e) {
    const dir = e.target.classList[0]
    let newSpaceId;
    if (dir === 'up') {
        const newSpaceStrArr = personSpace.className.split(' ')[0].split(',')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) - 1}`, newSpaceStrArr[1]].join('')
    }
    if (dir === 'dn') {
        const newSpaceStrArr = personSpace.className.split(' ')[3].split(',')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) + 1}`, newSpaceStrArr[1]].join('')
    }
    if (dir === 'lt') {
        const newSpaceStrArr = personSpace.className.split(' ')[1].split(',')
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) - 1}`].join('')
    }
    if (dir === 'rt') {
        const newSpaceStrArr = personSpace.className.split(' ')[2].split(',')
        console.log(newSpaceStrArr)
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) + 1}`].join('')
        console.log(newSpaceId)
    }
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ''
    getNodeOrNum(newSpaceId).innerHTML = icon
    personSpace = getNodeOrNum(newSpaceId)
    checkIfInside()
}

function getNodeOrNum(numOrNode) {
    const val = isNaN(numOrNode) ? numOrNode.id.slice(1) : document.querySelector(`#s${numOrNode}`)
    return val
}


function checkIfInside() {
    if (personSpace.id === 's25') return movingTimeout = window.setTimeout(switchPageIn, 5000)
}

function switchPageIn () {
    if (personSpace.id === 's25') {
        hmPg.style.setProperty('display', 'grid')
        outPg.style.setProperty('display', 'none')
        startingSpace.innerHTML = personSpace.innerHTML
        personSpace.innerHTML = ''
        personSpace = startingSpace
    }
    return window.clearTimeout(movingTimeout)
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

// class RiskEvent {
//     constructor(descrip, choicesPoss, incidentsPoss)
// }
const oneRiskEvent = {
    descrip: 'a homeless man showed up in your path',
    choicesPoss: [`avoid them`, `keep going`],
    incidentsPoss: [
        {
            type: cough, 
            prob: 20, 
        }, 
        {
            type: sneeze, 
            prob: 30,
        }
    ],
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
    },
    get hitMessage() {
        const messgs = [`He ${incidentHappened.descrip} right in your face. Omg; it's so gross!`]
        return messgs[0]
        // STRINGYYYYYYYYYYYYYY 
    },
    get someMessage() {
        const messgs = [`He ${incidentHappened.descrip} but he was facing away, hopefully you're okay 🤷‍♀️`]
        return messgs[0]
    },
    get missMessage() {
        const messgs = [`He didn't do anything; you're good; stop being so prejudiced!`]
        return messgs[0]
    },
    renderMessages(hitOrMiss) {
        if (!hitOrMiss) return this.missMessage
        if (hitOrMiss > 0.5) return this.hitMessage
        return this.someMessage
    }
}
    




const player = {
    exposure: 0,
    context: -1,
    expose(riskEvent) {
        const incident = riskEvent.whichIncident
        if (!incident) return renderCombinedMess([0, this.exposure / 5000], riskEvent)
        const incidAmnt = incident.exposAmnt * getRandomDilute(incident.inOutSpreadP[this.context + 1])
        this.exposure += incidAmnt
        window.setTimeout(this.rvrsAfterTime.bind(player), 3000, incidAmnt)
        renderCombinedMess([incidAmnt / incident.exposAmnt, this.exposure / 5000], riskEvent)
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

function blahBlah() {
    console.dir(this)
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

function renderCombinedMess(incidAndTot, riskEvent) {
    const incidMess = riskEvent.renderMessages(incidAndTot[0])
    if (incidAndTot[0] === 0) return console.log(`${incidMess}`)
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 1) return console.log(`${incidMess} but it was still enough...whop whop whop`)
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 1) return console.log(`${incidMess} and it got you there. Congrats! You got it!`)
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 0.7) return console.log(`${incidMess} but you're still close so...`)
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 0.7) return console.log(`${incidMess} and you're close now. Life sucks and people are...`)
    if (incidAndTot[0] <= 0.5 && incidAndTot[1] >= 0.4) return console.log(`${incidMess} and you only have some; you should be okay...`)
    if (incidAndTot[0] > 0.5 && incidAndTot[1] >= 0.4) return console.log(`${incidMess} and now you have some. You're still okay...`)
    if (incidAndTot[0] <= 0.5) return console.log(`${incidMess} and you don't have much on you. Stop freaking out`)
    if (incidAndTot[0] > 0.5) return console.log(`${incidMess} but you still don't have much. Calmes toi`)
}







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

player.expose(oneRiskEvent)
// window.setTimeout(() => player.expose(oneRikIncident), 6000)
// window.setTimeout(() => player.expose(oneRiskIncident), 8000)
// window.setTimeout(() => player.expose(oneRiskIncident), 10000)
// window.setTimeout(() => player.expose(oneRiskIncident), 12000)
