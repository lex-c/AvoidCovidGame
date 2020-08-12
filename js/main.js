let gmTime, incidentHappened
let pgIn = 'hmPg'

const intSize = 7000
const body = document.querySelector('body')
const hmPg = document.getElementById('homePg')
const outPg = document.getElementById('outPg')
const spacePg = document.getElementById('spacePg')
const hmOutBtn = document.getElementById('hmOutBtn')
const spcOutBtn = document.getElementById('spcOutBtn')
hmPg.style.setProperty('display', 'grid')

hmOutBtn.addEventListener('click', chngPage)
spcOutBtn.addEventListener('click', chngPage)

function chngPage(e) {
    document.getElementById(e.target.classList[0]).style.setProperty('display', 'none')
    outPg.style.setProperty('display', 'grid')
    pgIn = 'outPg'
    zombieInt = window.setInterval(genZombie, randomTime(intSize))
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
    statsDispRender()
}

function statsDispRender() {
    hmHealthEl.innerHTML = outHlth.innerHTML = spcHlth.innerHTML = `Health: ${player.health}`
    hmMHlthEl.innerHTML = outMHlth.innerHTML = spcMHlth.innerHTML = `Mental Health: ${player.mHlth}`
    hmFoodEl.innerHTML = outFd.innerHTML = spcFd.innerHTML = `Food: ${player.food}`
    gmTimeRender()
    hmMoneyEl.innerHTML = outMon.innerHTML = spcMon.innerHTML = `Cash: $${player.money}`
    hmMedsEl.innerHTML = outMeds.innerHTML = spcMeds.innerHTML = `Meds: ${player.meds}`
    hmProtItemsEl.innerHTML = outPI.innerHTML = spcPI.innerHTML = `notsure`
}

let gmTimer = setInterval(upSecs, 60)
function upSecs() {
    if (pgIn !== 'inBet') {
        gmTime += 60
        eatGetFatDepressed()
        statsDispRender()
        checkIfLose()
    }
}

function eatGetFatDepressed() {
    if (pgIn !== 'gcrPg' && gmTime % 3600 === 0 && player.food > 0) player.food -= 0.5
    if (pgIn !== 'gcrPg' && player.food === 0 && gmTime % 600 === 0) player.health -= 10
    //add meds and pgIn !== pharma
    if (pgIn === 'hmPg' && gmTime % 800 === 0) player.mHlth -= 1
    if (pgIn === 'gcrPg' && gmTime % 300 === 0 && player.money > 0) {
        player.food += 0.1
        player.money -= 5
    }
}

function checkIfLose() {
    if (player.health === 0) console.log('lose by health')
    if (player.mHlth === 0) console.log('lose by mhlth')
}

function gmTimeRender() {
    hmTimeEl.innerHTML = outTime.innerHTML = spcTime.innerHTML = `${parseInt(gmTime / 3600) % 24}H  ${parseInt(gmTime / 60) % 60}M  <strong>${parseInt(gmTime / 86400)}D`
}


//out page 


let personSpace = document.getElementById('s35')
const outHlth = document.getElementById('outHlth')
const outMHlth = document.getElementById('outMHlth')
const outFd = document.getElementById('outFd')
const outTime = document.getElementById('outTime')
const outMon = document.getElementById('outMon')
const outMeds = document.getElementById('outMeds')
const outPI = document.getElementById('outPI')
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
let personSpStrArr, newSpaceId, zombieInt, rEHappened, stNode, stZNum

// allBtnsD.addEventListener('click', showAndMove)
allBtns.forEach(e => e.addEventListener('click', showAndMove))

function showAndMove(e) {
    e.target.style.setProperty('opacity', '50%')
    setTimeout(e => e.target.style.setProperty('opacity', '10%'), 100, e)
    move(e)
}

function move(e) {
    const dir = e.target.classList[0]
    personSpStrArr = personSpace.className.split(' ')[0].split(',')
    if (dir === 'up') newSpaceId = [`${parseInt(personSpStrArr[0]) - 1}`, personSpStrArr[1]].join('')
    if (dir === 'dn') newSpaceId = [`${parseInt(personSpStrArr[0]) + 1}`, personSpStrArr[1]].join('')
    if (dir === 'lt') newSpaceId = [personSpStrArr[0], `${parseInt(personSpStrArr[1]) - 1}`].join('')
    if (dir === 'rt') newSpaceId = [personSpStrArr[0], `${parseInt(personSpStrArr[1]) + 1}`].join('')
    const icon = personSpace.innerHTML
    const lastPSpace = document.querySelector(`#${personSpace.id}`)
    personSpace.innerHTML = ''
    console.log(personSpStrArr, newSpaceId, getNodeOrNum(newSpaceId))
    personSpace = getNodeOrNum(newSpaceId) || personSpace
    personSpace.innerHTML = icon
    checkIfInBlock(lastPSpace)
}

function checkIfInBlock(lastStSpace) {
    if (personSpace.id === 's25' || personSpace.id === 's41') {
        window.clearInterval(zombieInt)
        checkIfBackOut = window.setInterval(resetInt, 1, lastStSpace)
        pgOutToHomeTO = setTimeout(switchPageIn, 2000, lastStSpace)
    }
}
function resetInt(lastSpace) {
    if (personSpace.id === lastSpace.id) {
        window.clearInterval(checkIfBackOut)
        window.clearTimeout(pgOutToHomeTO)
        zombieInt = window.setInterval(genZombie, randomTime(intSize))
    }
}
//------------------------change if above
function switchPageIn (justOutside) {
//this next one needs generalization
    window.clearInterval(checkIfBackOut)
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ''
    personSpace = document.querySelector(`#${justOutside.id}`)
    personSpace.innerHTML = icon
    outPg.style.setProperty('display', 'none')
    if (justOutside.id === 's35') {
        hmPg.style.setProperty('display', 'grid')
        pgIn = `hmPg`
    }
    if (justOutside.id === 's31') {
        player.context = 1
        gcrPgRender()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'gcrPg'
        tempIntSize = 0.6 * intSize
        setSpcInt()
    }
    // if (justOutsideId === 's37') {
    //     pgIn = 'park'
    // }
}

function genZombie() {
    window.clearInterval(zombieInt)
    freeStIds = Array.from(document.querySelectorAll('.st')).filter(space => space.id.slice(0, 1) === 's').map(space => space.classList[0])
    const personIndex = freeStIds.indexOf(`${getNodeOrNum(personSpace).split('').join(',')}`)
    freeStIds.splice(personIndex, 1)
    const randomStNum = getRandInArr(freeStIds)
    const num1 = Math.abs(randomStNum.split(',')[0])
    const num2 = Math.abs(randomStNum.split(',')[1])
    const personNum1 = Math.abs(personSpace.className.split(' ')[0].split(',')[0])
    const personNum2 = Math.abs(personSpace.className.split(' ')[0].split(',')[1])
    if (Math.abs(num1 - personNum1) + Math.abs(num2 - personNum2) === 1) {
        rEHappened = getRandInArr(RiskEvent.instances)
        randStNumId = randomStNum.split(',').join('')
        console.log(randStNumId, getNodeOrNum(randStNumId))
        setRemoveZ(randStNumId, getNodeOrNum(randStNumId))
        // allBtnsD.removeEventListener('click', showAndMove)
        allBtns.forEach(e => e.removeEventListener('click', showAndMove))
        pgIn = 'inBet'
        popUpChoice(randStNumId)
        return
    }
    zombieInt = window.setInterval(genZombie, randomTime(intSize))
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
            popUpRRender(player.expose(rEHappened))
        }
        if (chcClick.target.id === 'c2') console.log(`haven't set this up yet`)
        if (chcClick.target.id === 'c0' || chcClick.target.id === 'c1' || chcClick.target.id === 'c2') {
            ppUpD.style.setProperty('display', 'none')
            ppUpD.innerHTML = ''
            document.body.style.cursor = 'auto'
        }
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
        // allBtnsD.addEventListener('click', showAndMove)
        allBtns.forEach(e => e.addEventListener('click', showAndMove))
        pgIn = 'outPg'
        zombieInt = window.setInterval(genZombie, randomTime(intSize))
    }, 2000)
    ppUpRDiv.style.setProperty('display', 'flex')
}










//SPC PAGE -----------------------------------------
let spcInt, tempIntSize

const spcHlth = document.getElementById('spcHlth')
const spcMHlth = document.getElementById('spcMHlth')
const spcFd = document.getElementById('spcFd')
const spcTime = document.getElementById('spcTime')
const spcMon = document.getElementById('spcMon')
const spcInfo = document.getElementById('spcInfo')
const spcPP = document.getElementById('spcPP')
const spcMeds = document.getElementById('spcMeds')
const spcPI = document.getElementById('spcPI')
//outbtn defined above could bring down -----------------------------------

//gcrPg
function gcrPgRender() {
    spcInfo.innerHTML = `Welcome to the grocery! <br> As you wait your cash is being used <br> to increase your food.<br> But beware! Hazards are much higher and more frequent <br>in a small enclosed space...`
    spacePg.style.setProperty('background-image', `url('images/gcrimg.jpeg')`)
}

function setSpcInt() {
    spcInt = window.setInterval(genRE, randomTime(tempIntSize))
}

function genRE() {
    window.clearInterval(spcInt)
    pgIn = 'inBet'
    spcPPRender(getRandInArr(RiskEvent.instances))
}

function spcPPRender(evtHapp) {
    spcInfo.style.setProperty('display', 'none')
    const descripH = document.createElement('h3')
    descripH.innerHTML = `${evtHapp.descrip}`
    spcPP.appendChild(descripH)
    const qH = document.createElement('h4')
    qH.innerHTML = `What would you like to do?`
    spcPP.appendChild(qH)
    const chcDiv = document.createElement('div')
    spcPP.appendChild(chcDiv)
    const chcRun = document.createElement('h4')
    chcRun.setAttribute('id', 'run')
    chcRun.innerHTML = `Leave NOW!`
    chcRun.addEventListener('click', (e) => respCheck(e, evtHapp))
    chcDiv.appendChild(chcRun)
    const chcStay = document.createElement('h4')
    chcStay.setAttribute('id', 'stay')
    chcStay.innerHTML = `Carry on`
    chcStay.addEventListener('click', (e) => respCheck(e, evtHapp)) 
    chcDiv.appendChild(chcStay)
    chcDiv.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
    chcDiv.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
    spcPP.style.setProperty('display', 'flex')
} 

function respCheck(e, evtHapp) {
    spcPP.style.setProperty('display', 'none')
    spcPP.innerHTML = ``
    if (e.target.id === 'run') respRend(0)
    if (e.target.id === 'stay') respRend(player.expose(evtHapp))
}

function respRend(which) {
    const initMess = spcInfo.innerHTML.toString()
    if (!which) spcInfo.innerHTML = 'Okay, leaving now'
    if (which) spcInfo.innerHTML = which
    spcInfo.style.setProperty('display', 'flex')
    setTimeout(() => {
        if (!which) {spacePg.style.setProperty('display', 'none'); tempIntSize = 1; pgIn = 'outPg'; outPg.style.setProperty('display', 'grid')}
        if (which) {spcInfo.innerHTML = initMess; pgIn = 'gcrPg'; spcInt = window.setInterval(genRE, randomTime(tempIntSize))}
    }, 1000)
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
        if (!incident) return renderCombinedMess([0, this.exposure / 5000], riskEvent)
        const incidAmnt = incident.exposAmnt * getRandomDilute(incident.inOutSpreadP[this.context + 1])
        this.exposure += incidAmnt
        window.setTimeout(this.rvrsAfterTime.bind(player), 3000, incidAmnt)
        // this.check()
        return renderCombinedMess([incidAmnt / incident.exposAmnt, this.exposure / 5000], riskEvent)
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
