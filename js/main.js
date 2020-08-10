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
    if (e.target.classList[1] === 'outPg') return zombieInt = window.setInterval(genZombie, randomTime(1000))
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


let stIds = []
for (let value of allStDivs) stIds.push(value.id.slice(1))
let newSpaceStrArr, newSpaceId, zombieInt, rEHappened


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
    if (dir === 'up') {
        newSpaceStrArr = personSpace.className.split(' ')[0].split(',')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) - 1}`, newSpaceStrArr[1]].join('')
    }
    if (dir === 'dn') {
        newSpaceStrArr = personSpace.className.split(' ')[3].split(',')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) + 1}`, newSpaceStrArr[1]].join('')
    }
    if (dir === 'lt') {
        newSpaceStrArr = personSpace.className.split(' ')[1].split(',')
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) - 1}`].join('')
    }
    if (dir === 'rt') {
        newSpaceStrArr = personSpace.className.split(' ')[2].split(',')
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) + 1}`].join('')
    }
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ''
    personSpace = getNodeOrNum(newSpaceId)
    personSpace.innerHTML = icon
    checkIfInside()
}

function getNodeOrNum(numOrNode) {
    const val = isNaN(numOrNode) ? numOrNode.id.slice(1) : document.querySelector(`#s${numOrNode}`)
    return val
}

function checkIfInside() {
    if (personSpace.id === 's25') setTimeout(switchPageIn, 5000)
}

function switchPageIn () {
    if (personSpace.id === 's25') {
        const icon = personSpace.innerHTML
        personSpace.innerHTML = ''
        personSpace = document.getElementById('s35')
        personSpace.innerHTML = icon
        hmPg.style.setProperty('display', 'grid')
        outPg.style.setProperty('display', 'none')
    }
}



function genZombie() {
    window.clearInterval(zombieInt)
    const personIndex = stIds.indexOf(getNodeOrNum(personSpace))
    if (personIndex >= 0) stIds.splice(personIndex, 1)
    const randomStNum = stIds[Math.floor(Math.random() * stIds.length)]
    console.log('random node picked', randomStNum)
    const num1 = Math.abs(randomStNum.split('')[0])
    const num2 = Math.abs(randomStNum.split('')[1])
    const personNum1 = Math.abs(getNodeOrNum(personSpace).split('')[0])
    const personNum2 = Math.abs(getNodeOrNum(personSpace).split('')[1])
    if (Math.abs(num1 - personNum1) + Math.abs(num2 - personNum2) === 1){
        getNodeOrNum(randomStNum).innerHTML = `<i class="fas fa-universal-access"></i>`
        rEHappened = getRandInArr(RiskEvent.instances)
        popUpChoice(rEHappened, randomStNum)
        return window.clearInterval(zombieInt)
    }
    zombieInt = window.setInterval(genZombie, randomTime(1000))
}


function popUpChoice(evtHappd, zombStNum) {
    const descripH = document.createElement('h2')
    descripH.innerHTML = `${evtHappd.descrip}`
    ppUpD.appendChild(descripH)
    const qH = document.createElement('h2')
    qH.innerHTML = `What would you like to do:`
    ppUpD.appendChild(qH)
    const optionsDiv = document.createElement('div')
    optionsDiv.setAttribute('class', 'optionsdiv')
    ppUpD.appendChild(optionsDiv)
    evtHappd.choicesPoss.forEach((e, i) => {
        const choiceEl = document.createElement('h3')
        choiceEl.innerHTML = `${e}`
        choiceEl.setAttribute('id', `c${i}`)
        choiceEl.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
        choiceEl.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
        optionsDiv.appendChild(choiceEl)
    })
    optionsDiv.addEventListener('click', (chcClick) => {
        if (chcClick.target.id === 'c0') lockSpot(zombStNum)
        if (chcClick.target.id === 'c1') player.expose(evtHappd)
        if (chcClick.target.id === 'c2') console.log(`haven't set this up yet`)
        ppUpD.style.setProperty('display', 'none')
        return ppUpD.innerHTML = ''
    })
    ppUpD.style.setProperty('display', 'flex')
}

function lockSpot(zombNum) {
    const personMvClss = personSpace.className
    const personNum = getNodeOrNum(personSpace)
    let newClssNm
    if (parseInt(zombNum.split('')[0]) === parseInt(personNum.split('')[0]) - 1) {newClssNm = personSpace.className.split(' '); newClssNm.splice(0, 1, `${personNum.split('')[0] + 1},${personNum.split('')[1]}`)}
    if (parseInt(zombNum.split('')[0]) === parseInt(personNum.split('')[0]) + 1) {newClssNm = personSpace.className.split(' '); newClssNm.splice(3, 1, `${personNum.split('')[0] - 1},${personNum.split('')[1]}`)}
    if (parseInt(zombNum.split('')[1]) === parseInt(personNum.split('')[1]) - 1) {newClssNm = personSpace.className.split(' '); newClssNm.splice(1, 1, `${personNum.split('')[0]},${personNum.split('')[1] + 1}`)}
    if (parseInt(zombNum.split('')[1]) === parseInt(personNum.split('')[1]) + 1) {newClssNm = personSpace.className.split(' '); newClssNm.splice(2, 1, `${personNum.split('')[0]},${personNum.split('')[1] - 1}`)}
    personSpace.className = newClssNm.join(' ')
    //setTimeout
    //displaylockmess
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
const homelessMan1 = new RiskEvent(`homelessMan1`, 'a homeless man showed up in your path', [`avoid them`, `keep going`, 'put prot and kp going'], [{type: cough, prob: 20,}, {type: sneeze, prob: 30,}], [`He right in your face. Omg; it's so gross!`, `another hit messg`, `and a third hit messg`], [`He but he was facing away, hopefully you're okay 🤷‍♀️`], [`He didn't do anything; you're good; stop being so prejudiced!`])
const homelessWoman1 = new RiskEvent('homelessWoman2', `a`, ['a', 'b', 'c'], [{type: cough, prob: 20}, {type: sneeze, prob: 30}], [`she right on your chest. Ewwww...`], [`she but she covered her mouth`], [`she's just minding her own business. You could have helped her...`])


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


//----------------utility fxns----------------------------
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

player.expose(homelessWoman1)
console.log(RiskEvent.instances)
// window.setTimeout(() => player.expose(oneRikIncident), 6000)
// window.setTimeout(() => player.expose(oneRiskIncident), 8000)
// window.setTimeout(() => player.expose(oneRiskIncident), 10000)
// window.setTimeout(() => player.expose(oneRiskIncident), 12000)
