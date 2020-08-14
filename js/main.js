let gmTimer, gmTime, incidentHappened, exposureAtExpose, incidAmnt
let expsStore = []
let pgIn = 'inBet'

const baseIntSize = 2000
let intSize = parseInt(baseIntSize)

const body = document.querySelector('body')
const hmPg = document.getElementById('homePg')
const outPg = document.getElementById('outPg')
const spacePg = document.getElementById('spacePg')
const hmOutBtn = document.getElementById('hmOutBtn')
const spcOutBtn = document.getElementById('spcOutBtn')
spcOutBtn.addEventListener('click', chngPage)

function chngPage(e) {
    if (pgIn !== 'hmPg') window.clearInterval(spcInt)
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
const winLsMessEl = document.getElementById('winLsMess')
const hmMedsEl = document.getElementById('hmMeds')
const hmOutDiv = document.getElementById('hmOutDiv')
const rulesD = document.getElementById('rulesMess')
const playBtn = document.getElementById('playBtn')
const exrBtn = document.getElementById('exrBtn')
const alcBtn = document.getElementById('alcBtn')
const chocBtn = document.getElementById('chocBtn')
const tigBtn = document.getElementById('tigBtn')
const allChcBtns = document.querySelectorAll('.chcbtn')

allChcBtns.forEach(btn => btn.addEventListener('click', hmAct))

function hmAct(e) {
    if (e.target.id === 'exrBtn' && ((player.money > 20 && player.food >= 5) || (player.money >= 20 && player.food > 5))) {
        player.money -= 20
        player.food -= 5
        player.health <= 90 ? player.health += 10 : player.health = 100
        player.mHlth <= 90 ? player.mHlth += 10 : player.mHlth = 100
    }
    if (e.target.id === 'alcBtn' && player.money > 20) {
        player.money -= 20
        player.mHlth <= 95 ? player.mHlth += 5 : player.mHlth = 100
        player.health >= 5 ? player.health -= 5 : player.health = 0
    }
    if (e.target.id === 'chocBtn' && player.money >= 5) {
        player.money -= 5
        player.mHlth <= 95 ? player.mHlth += 5 : player.mHlth = 100
    }
    if (e.target.id === 'tigBtn') {
        player.mHlth >= 5 ? player.mHlth -= 5 : player.mHlth = 0
        if (player.meds > 1) player.meds -= 1
    } 
    player.check(5)
}

playBtn.addEventListener('click', init)

function hmPgInit() {
    pgIn = 'hmPg'
    statsDispRender()
    hmOutBtn.addEventListener('click', chngPage)
}

function statsDispRender() {
    hmHealthEl.innerHTML = outHlth.innerHTML = spcHlth.innerHTML = `<i class="fas fa-heartbeat"></i>` + ` ${player.health}`
    hmMHlthEl.innerHTML = outMHlth.innerHTML = spcMHlth.innerHTML = `<i class="far fa-smile-beam"></i>` + ` ${player.mHlth}`
    hmFoodEl.innerHTML = outFd.innerHTML = spcFd.innerHTML = `${player.food}` + ` <i class="fas fa-utensils"></i>`
    gmTimeRender()
    hmMoneyEl.innerHTML = outMon.innerHTML = spcMon.innerHTML = `$${player.money}` + ` <i class="fas fa-money-bill-wave"></i>`
    hmMedsEl.innerHTML = outMeds.innerHTML = spcMeds.innerHTML = `${player.meds}` + ` <i class="fas fa-pills"></i>`
}

function upSecs() {
    if (pgIn !== 'inBet') {
        if (gmTime === 2880) {wLIntsPgsSet(0); player.winLose = true; return}
        gmTime += 1
        player.eatGetFatDepressed()
        statsDispRender()
        player.check(5)
    }
}

function gmTimeRender() {
    hmTimeEl.innerHTML = outTime.innerHTML = spcTime.innerHTML = `${parseInt(gmTime / 60) % 24}H` + ` ${parseInt(gmTime % 60)}M` + ` <strong>${parseInt(gmTime / 1440)}D`
}

//out page 
const outHlth = document.getElementById('outHlth')
const outMHlth = document.getElementById('outMHlth')
const outFd = document.getElementById('outFd')
const outTime = document.getElementById('outTime')
const outMon = document.getElementById('outMon')
const outMeds = document.getElementById('outMeds')
const rtBtn = document.getElementById('rtBtn')
const ltBtn = document.getElementById('ltBtn')
const upBtn = document.getElementById('upBtn')
const dnBtn = document.getElementById('dnBtn')
const allBtnsD = document.querySelector('.allbtnsdiv')
const allBtns = document.querySelectorAll('.divbtn')
const allStDivs = document.querySelectorAll('.st')
const ppUpD = document.querySelector('.popupdiv')
const ppUpRDiv = document.querySelector('#ppRDiv')

let personSpace = document.getElementById('s35')
let zombieArr = []
let stIds = []
for (let value of allStDivs) stIds.push(value.id.slice(1))
let personSpStrArr, newSpaceId, zombieInt, rEHappened, stNode, stZNum, tempIntSize

window.addEventListener('keydown', checkArrow)

function checkArrow(e) {
    if (e.key === "ArrowUp") return move('up')
    if (e.key === "ArrowDown") return move('dn')
    if (e.key === "ArrowLeft") return move('lt')
    if (e.key === "ArrowRight") return move('rt')
}

allBtns.forEach(e => e.addEventListener('click', showAndMove))

function showAndMove(e) {
    e.target.style.setProperty('background-color', 'rgba(200, 200, 200, 0.4)')
    setTimeout(e => e.target.style.setProperty('background-color', 'rgba(200, 200, 200, 0.1)'), 100, e)
    move(e)
}

function move(e) {
    const dir = e.target ? e.target.classList[0] : e
    personSpStrArr = personSpace.className.split(' ')[0].split(',')
    if (dir === 'up') newSpaceId = [`${parseInt(personSpStrArr[0]) - 1}`, personSpStrArr[1]].join('')
    if (dir === 'dn') newSpaceId = [`${parseInt(personSpStrArr[0]) + 1}`, personSpStrArr[1]].join('')
    if (dir === 'lt') newSpaceId = [personSpStrArr[0], `${parseInt(personSpStrArr[1]) - 1}`].join('')
    if (dir === 'rt') newSpaceId = [personSpStrArr[0], `${parseInt(personSpStrArr[1]) + 1}`].join('')
    const icon = personSpace.innerHTML
    const lastPSpace = document.querySelector(`#${personSpace.id}`)
    personSpace.innerHTML = ''
    personSpace = getNodeOrNum(newSpaceId) || personSpace
    personSpace.innerHTML = icon
    checkIfInBlock(lastPSpace)
}

function checkIfInBlock(lastStSpace) {
    if (personSpace.id === 's25' || personSpace.id === 's41' || personSpace.id === 's47' || personSpace.id === 's29' || personSpace.id === 's81' || personSpace.id === 's112' || personSpace.id === 's810') {
        window.clearInterval(zombieInt)
        pgIn = 'inBet'
        checkIfBackOut = window.setInterval(resetInt, 1, lastStSpace)
        pgOutToHomeTO = setTimeout(switchPageIn, 2000, lastStSpace)
    }
}
function resetInt(lastSpace) {
    if (personSpace.id === lastSpace.id) {
        window.clearInterval(checkIfBackOut)
        window.clearTimeout(pgOutToHomeTO)
        pgIn = 'outPg'
        zombieInt = window.setInterval(genZombie, randomTime(intSize))
    }
}

function switchPageIn (justOutside) {
    window.clearInterval(checkIfBackOut)
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ''
    personSpace = document.querySelector(`#${justOutside.id}`)
    personSpace.innerHTML = icon
    outPg.style.setProperty('display', 'none')
    if (justOutside.id === 's35' || justOutside.id === 's24') {
        hmPg.style.setProperty('display', 'grid')
        pgIn = `hmPg`
    }
    if (justOutside.id === 's31') {
        player.context = 1
        gcrPgRender()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'gcrPg'
        tempIntSize = 30 * intSize
        setSpcInt()
    }
    if (justOutside.id === 's37' || justOutside.id === 's48') {
        parkRender()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'park'
        tempIntSize = 30 * intSize
        setSpcInt()
    }
    if (justOutside.id === 's28') {
        workRender()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'work'
        tempIntSize = 50 * intSize
        setSpcInt()
    }
    if (justOutside.id === 's71') {
        pharmaRender()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'pharma'
        tempIntSize = 30 * intSize
        setSpcInt()
    }
    if (justOutside.id === 's111') {
        gcr2Render()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'gcrPg'
        tempIntSize = 60 * intSize
        setSpcInt()
    }
    if (justOutside.id === 's710' || justOutside.id === 's811') {
        pharma2Render()
        spacePg.style.setProperty('display', 'grid')
        pgIn = 'pharma'
        tempIntSize = 50 * intSize
        setSpcInt()
    }
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
        setRemoveZ(randStNumId, getNodeOrNum(randStNumId))
        allBtns.forEach(e => e.removeEventListener('click', showAndMove))
        window.removeEventListener('keydown', checkArrow)
        pgIn = 'inBet'
        if (checkIfTwo()) return mustChoose(checkIfTwo()) 
        popUpChoice(randStNumId)
        return
    }
    zombieInt = window.setInterval(genZombie, randomTime(intSize))
}

function checkIfTwo() {
    pSpcArr = personSpace.className.split(' ')[0].split(',')
    dir1 = [`${parseInt(pSpcArr[0]) - 1}`, pSpcArr[1]].join('')
    dir2 = [`${parseInt(pSpcArr[0]) + 1}`, pSpcArr[1]].join('')
    dir3 = [pSpcArr[0], `${parseInt(pSpcArr[1]) - 1}`].join('')
    dir4 = [pSpcArr[0], `${parseInt(pSpcArr[1]) + 1}`].join('')
    const chckZombsArr = [dir1, dir2, dir3, dir4].filter(dir => stIds.indexOf(dir) >= 0).filter(dir => document.querySelector(`.s${dir}`).id.slice(0, 2) === 'ii')
    if (chckZombsArr.length === 2) return chckZombsArr
}

function mustChoose(idsArr) {
    const zArr = idsArr.map(e => zombieArr[e])
    const titleH = document.createElement('h3')
    titleH.innerHTML = `You are surrounded 😥 You must choose between them. Unfair, but c'est la vie...`
    ppUpD.appendChild(titleH)
    const qH = document.createElement('h3')
    qH.innerHTML = `Which One:`
    ppUpD.appendChild(qH)
    const optionsDiv = document.createElement('div')
    optionsDiv.setAttribute('class', 'optionsdiv')
    ppUpD.appendChild(optionsDiv)
    idsArr.forEach((e, i) => {
        const descripH = document.createElement('h3')
        descripH.innerHTML = `${zArr[i].descrip}`
        descripH.setAttribute('id', `z${e}`)
        descripH.addEventListener('click', () => playExp(zArr[i], idsArr))
        optionsDiv.appendChild(descripH)
    })
    optionsDiv.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
    optionsDiv.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
    ppUpD.style.setProperty('display', 'flex')
}

function playExp(rEChosen, idsArr) {
    ppUpD.style.setProperty('display', 'none')
    ppUpD.innerHTML = ''
    idsArr.filter(dir => document.querySelector(`.s${dir}`).id.slice(0, 2) === 'ii').forEach(e => setRemoveZ(e))
    popUpRRender(player.expose(rEChosen))
}

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
    const chc1 = document.createElement('h3')
    chc1.innerHTML = `Run away!`
    chc1.setAttribute('id', `run`)
    chc1.addEventListener('click', () => runOrStay(0, zId))
    optionsDiv.appendChild(chc1)
    const chc2 = document.createElement('h3')
    chc2.innerHTML = `Carry on`
    chc2.setAttribute('id', `stay`)
    chc2.addEventListener('click', () => runOrStay(1, zId))
    optionsDiv.appendChild(chc2)
    optionsDiv.addEventListener('mouseover', () => document.body.style.cursor = 'pointer')
    optionsDiv.addEventListener('mouseleave', () => document.body.style.cursor = 'auto')
    ppUpD.style.setProperty('display', 'flex')
}

function runOrStay(rOrS, zId) {
    if (!rOrS) {
        if (player.caution > 2) player.caution -= 2
        intSize *= (player.caution / 100)
        walkAway(zId)
    } 
    if (rOrS) {
        setRemoveZ(zId)
        popUpRRender(player.expose(rEHappened))
    }
    ppUpD.style.setProperty('display', 'none')
    ppUpD.innerHTML = ''
    document.body.style.cursor = 'auto'
}


function walkAway(zId) {
    setTimeout(setRemoveZ, 11000, zId)
    popUpRRender(0)
}
 
function popUpRRender(which) {
    if (!which) ppUpRDiv.innerHTML = `Your caution dropped; they'll come faster now...`
    if (which) ppUpRDiv.innerHTML = which
    setTimeout(() => {
        ppUpRDiv.style.setProperty('display', 'none')
        ppUpRDiv.innerHTML = ``
        allBtns.forEach(e => e.addEventListener('click', showAndMove))
        window.addEventListener('keydown', checkArrow)
        if (player.check(rEHappened)) return 
        pgIn = 'outPg'
        zombieInt = window.setInterval(genZombie, randomTime(intSize))
    }, 3000)
    ppUpRDiv.style.setProperty('display', 'flex')
}                 
            
//SPC PAGE -----------------------------------------
let lastPgIn, spcInt

const spcHlth = document.getElementById('spcHlth')
const spcMHlth = document.getElementById('spcMHlth')
const spcFd = document.getElementById('spcFd')
const spcTime = document.getElementById('spcTime')
const spcMon = document.getElementById('spcMon')
const spcInfo = document.getElementById('spcInfo')
const spcPP = document.getElementById('spcPP')
const spcMeds = document.getElementById('spcMeds')

//gcrPg
function gcrPgRender() {
    spcInfo.innerHTML = `Welcome to the grocery!<br>spend money to get food.`
    spacePg.style.setProperty('background-image', `url('images/gcrimg.jpeg')`)
}

//park Page

function parkRender() {
    spcInfo.innerHTML = `You're in the park! Enjoy the fresh air!!!<br>(hopefully...)`
    spacePg.style.setProperty('background-image', `url('images/prkimg.jpeg')`)
}

//work Page
function workRender() {
    spcInfo.innerHTML = `Work time; let's get that money`
    spacePg.style.setProperty('background-image', `url('images/wrkimg.jpeg')`)
}

//pharma page
function pharmaRender() {
    spcInfo.innerHTML = `In the pharm and gettin' some meds. Watch out for the sick ppl!`
    spacePg.style.setProperty('background-image', `url('images/pharmaimg.jpeg')`)
}

//2nd gcr pg 
function gcr2Render() {
    spcInfo.innerHTML = `Welcome to the 'ooother' grocery; the one for better people that's more expensive but also much less crowded... enjoy the overpriced food...`
    spacePg.style.setProperty('background-image', `url('images/fancygcr.jpeg')`)
}

//2nd pharma page 
function pharma2Render() {
    spcInfo.innerHTML = `This is the quieter, family-owned pharmacy; it's a little harder to get to, but less people around...`
    spacePg.style.setProperty('background-image', `url('images/otherpharma.jpeg')`)
}

function setSpcInt() {
    spcInt = window.setInterval(genRE, randomTime(tempIntSize))
}

function genRE() {
    spcOutBtn.removeEventListener('click', chngPage)
    window.clearInterval(spcInt)
    lastPgIn = pgIn.toString()
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
    if (e.target.id === 'stay') respRend(player.expose(evtHapp), evtHapp)
}

function respRend(which, rE) {
    const initMess = spcInfo.innerHTML.toString()
    if (!which) spcInfo.innerHTML = 'Okay, leaving now'
    if (which) {
        spcInfo.style.gridArea = '3 / 2 / 8 / 7'
        spcInfo.style.fontSize = '2rem'
        spcInfo.innerHTML = which
    }
    spcInfo.style.setProperty('display', 'flex')
    setTimeout(() => {
        if (!which) {
            spacePg.style.setProperty('display', 'none') 
            spcInfo.innerHTML = ``
            tempIntSize = 1 
            pgIn = 'outPg'
            outPg.style.setProperty('display', 'grid')
            zombieInt = window.setInterval(genZombie, randomTime(intSize)) 
        }
        if (which) {
            spcInfo.style.gridArea = '4 / 2 / 7 / 7'
            spcInfo.style.fontSize = '2.5rem'
            spcInfo.innerHTML = initMess
            if (player.check(rE)) return  
            pgIn = lastPgIn
            spcInt = window.setInterval(genRE, randomTime(tempIntSize))
        }
        spcOutBtn.addEventListener('click', chngPage)
    }, 3000)
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
const cough = new Incident('coughed', 'vap', 20000, [70, 70, 70, 70, 20, 20, 20, 20, 10, 0], [95, 90, 80, 80, 80, 70, 20, 10, 10, 0])
const sneeze = new Incident('sneezed', 'vap', 5000, [90, 70, 50, 50, 30, 30, 20, 0, 0, 0], [90, 90, 80, 80, 60, 60, 60, 30, 30, 10])
const spit = new Incident('spit', 'vap', 5000, [60, 50, 40, 0, 0], [80, 60, 40, 20, 0])
const yell = new Incident('yelled', 'vap', 100, [80, 50, 30, 10, 0], [90, 90, 80, 70, 60])
const vomit = new Incident('threw up', 'vap', 20000, [60, 20, 10, 0, 0], [80, 50, 40, 30, 0])
const talk = new Incident('talked', 'vap', 1000, [10, 1, 0, 0, 0, 0, 0, 0, 0, 0], [70, 60, 50, 30, 0])
const pee = new Incident('peed', 'vap', 10000, [40, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [75, 50, 1, 0, 0, 0, 0])

class RiskEvent {
    constructor(name, descrip, incidentsPoss, hitMessgs, someMessgs, missMessgs) {
        this.name = name,
        this.descrip = descrip,
        this.incidentsPoss = incidentsPoss,
        this.hitMessgs = hitMessgs,
        this.someMessgs = someMessgs,
        this.missMessgs = missMessgs
        RiskEvent.instances.push(this)
    }
    
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
RiskEvent.instances = []

const homelessMan1 = new RiskEvent(`homeless man wearing a huge puffer coat and smelling of sardines`, `A homeless man with fish in his teeth`, [{type: cough, prob: 40,}, {type: sneeze, prob: 60,}, {type: spit, prob: 70}, {type: vomit, prob: 80}, {type: pee, prob: 90}, {type: yell, prob: 95}], [`He in your face; sardine pieces flying everywhere. Omg; it's so gross!`, `He right at you, and then cussed you loudly and started to run after you`, `He while looking you dead in the eyes. He enjoyed it.`], [`He but he was facing away`, `He after covering his mouth with a fist that still left too much of his mouth visible`], [`He didn't do anything; you're good; stop being so prejudiced!`, `He was just looking for compassion, he didn't even open his mouth...`])
const homelessWoman1 = new RiskEvent('homeless woman singing softly to herself and sipping 7-11 coffee out of her coins cup', `A poor homeless woman`, [{type: cough, prob: 20}, {type: sneeze, prob: 40}, {type: vomit, prob: 50}, {type: yell, prob: 70}], [`She right on your chest. Ewwww...`], [`She but she covered her mouth`], [`She's just minding her own business. Way to freak out...`])
const trumpSupporter = new RiskEvent(`man wearing a bright red MAGA hat to match his red angry face and with a bulge in his pants that looks suspiciously like a gun`, `A man with a MAGA cap and no mask glaring at you`, [{type: yell, prob: 40}, {type: pee, prob: 60}, {type: cough, prob: 80}, {type: spit, prob: 95}], ['He directly at you while his face puffed up with impotent rage', `He in your chest, saying something about capitalism you couldn't quite comprehend`, `He at you and apparently at every passerby. Shame you didn't notice before...`], [`He but not at you; he probably didn't even notice you; just keep moving...`, `He and he kiiind of covered it`, `He but he couldn't quite get it all out...`], [`He was just getting off the phone and putting his mask back on. Stop stereotyping people!`, `He was just bending down to lick a puppy and wasn't threatening you`, `He was satisfied with just the glare`])
const momWithThreeToddlers = new RiskEvent('little toddler with a runny nose and a stuffed bunny that he loves', 'A frazzled mom with three little kids running around', [{type: cough, prob: 30}, {type: pee, prob: 50}, {type: vomit, prob: 70}], [`Tommy on your leg`, `Jimmy in your crotch. Good thing you were there for it`, `Robby while looking deeply in your eyes with a profound ponderous look that belied his meager years`], [`Jimmy but it wasn't in your direction and kids are such small people...`, `Robby into his hand like a good little boy and almost nothing went on you, at least that's what he kept arguing to his mom as they walked away`, `Tommy mildy ad half-heartedly like it was something he wasn't really sure about...`], [`As you rush past, you notice little Jimmy's insecure probing hurt little eyes; he's probably wondering why you look scared of him...`, `They're way too busy to notice you and carry on arguing loudly about an ugly little stuffed bunny`, `They look so cute, shame you're too scared to approach them`, `Nothing happened`])
const randomGuy = new RiskEvent('guy wearing a full tracksuit in the middle of August, one hole-punch earing in his left ear, and permanent beard shadow', `A middle-aged man who looks a little off`, [{type: cough, prob: 30}, {type: yell, prob: 60}, {type: sneeze, prob: 80}], [`He while holding his fist five feet away from his mouth and throwing you an unfazed look he's probably worn since October that says 'so what, I'm just being me`, `He - supposedly aiming down for the side of the road, but apparently he has bad aim`, `He at you and then almost knocked you over as he walked right through you`], [`He absentmindedly, not really in your direction, and then even gave you a little nod as he passed`, `He but caught himself at the last minute and brought his hand up to catch the end of it. Then he kept his hand over his mouth and even gave another exaggerated little fake cough to emphasize his cautious behavior`], [`He's just walking past and didn't even spare you a glance`, `His eyes sparked as he met your glance as if he thought he recognized you, but it only lasted a second...`])
// const fashionGirl = new RiskEvent('girl doing exxagerated poses in the middle of the sidewalk for her crouching insta hubby five feet away', 'A girl taking fashion pics', [{type: yell, prob: 40}, {type: cough, prob: 60}, {type: sneeze, prob: 70}, {type: talk, prob: 90}], [`She in a cute little way while holding her hand primly two feet from her mouth`, `She while throwing you an annoyed look for walking through her shoot`,])
// const randomGirl
// const partyingCollegeKids
// const teenageBoy
// const gothGirl
// const harriedMiddleAgedBM
// const restlessYoungMan
// const monk

const player = {
    exposure: 0,
    context: -1,
    expose(riskEvent) {
        const incident = riskEvent.whichIncident
        if (!incident) return renderCombinedMess([0, this.exposure / this.riskFactor], riskEvent)
        incidAmnt = incident.exposAmnt * getRandomDilute(incident.inOutSpreadP[this.context + 1])
        this.exposure += incidAmnt
        exposureAtExpose = parseFloat(this.exposure)
        thisIncidAmnt = parseFloat(incidAmnt)
        expsStore[`${incidAmnt}`] = []
        expsStore[`${incidAmnt}`][0] = (window.setInterval(this.rvrsAfterTime.bind(player), 10, thisIncidAmnt))
        expsStore[`${incidAmnt}`][1] = 0
        return renderCombinedMess([incidAmnt / incident.exposAmnt, this.exposure / this.riskFactor], riskEvent)
    },
    rvrsAfterTime(amount) {
        if (this.winLose) {
            window.clearInterval(expsStore[`${amount}`][0])
            delete expsStore[`${amount}`]
            return
        }
        if (pgIn !== 'inBet') {
            expsStore[`${amount}`][1] = expsStore[`${amount}`][1] + 1
            console.log(expsStore[`${amount}`][1])
            if (expsStore[`${amount}`][1] === 1000) {
                console.log(this.exposure)
                this.exposure -= parseFloat(amount)
                console.log(this.exposure)
                window.clearInterval(expsStore[`${amount}`][0])
                delete expsStore[`${amount}`]
            }
        }
    },
    eatGetFatDepressed() {
        if (pgIn !== 'gcrPg' && this.food > 0 && gmTime % 3 === 0) this.food -= 1
        if (pgIn !== 'gcrPg' && this.food === 0 && this.health > 0 && gmTime % 5 === 0) this.health -= 1;
        if (pgIn === 'park' && this.mHlth < 100 && gmTime % 5 === 0) this.mHlth += 1
        if (pgIn === 'work' && this.mHlth > 0 && this.money < 500 && gmTime % 10 === 0) {this.money += 5; this.mHlth -= 1; this.health -= 1}
        if (pgIn === 'hmPg' && this.mHlth > 0 && gmTime % 7 === 0) this.mHlth -= 1
        if (pgIn === 'gcrPg' && gmTime % 2 === 0 && this.money > 5 && this.food < 50) {this.food += 1; this.money -= 5}
        if (pgIn !== 'pharma' && gmTime % 10 === 0 && this.meds > 0) this.meds -= 1
        if (pgIn === 'pharma' && gmTime % 2 === 0 && this.meds < 60) this.meds += 1
        if (pgIn !== 'pharma' && this.meds === 0 && gmTime % 5 === 0) this.health -= 1
        if (pgIn === 'hmPg' && this.meds > 40 && this.health < 100 && gmTime % 10 === 0) this.health += 1 
        if (pgIn === 'hmPg' && this.mHlth > 25 && this.caution < 100 && gmTime % 15 === 0) this.caution += 1
    },
    get riskFactor() {
        const calcRf = 2000 + ((3 * (this.health / 100) + (this.mHlth / 100)) / 4) * 3000
        return calcRf
    },
    check(rE) {
        if (this.health === 0) {wLIntsPgsSet(1); this.winLose = true; return 1}
        if (this.mHlth === 0) {wLIntsPgsSet(2); this.winLose = true; return 1}
        if (exposureAtExpose >= this.riskFactor && isNaN(rE)) {wLIntsPgsSet(rE); this.winLose = true; return 1}
    },
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

function wLIntsPgsSet(cond) {
    window.clearInterval(gmTimer)
    if (isNaN(cond)) return renderWinOrLoss(cond)
    if (pgIn === 'outPg') window.clearInterval(zombieInt)
    if (pgIn !== 'hmPg' && pgIn !== 'outPg') window.clearInterval(spcInt)
    pgIn = 'inBet'
    return renderWinOrLoss(cond)
}

function renderWinOrLoss(winOrLoseType) {
    const messFragments = [null, 'poor health. You have to stay healthy to survive...', "depression. It's tough to keep going..."] 
    const wLMessH = document.createElement('h3') 
    if (!winOrLoseType) {
        wLMessH.innerHTML = `Congrats! You Won!`
    } else {
        isNaN(winOrLoseType) ? wLMessH.innerHTML = `You caught it from a ${winOrLoseType.name} 🤷‍♀️ You can only do so much...` : wLMessH.innerHTML = `You died from ${messFragments[winOrLoseType]}`
    }
    winLsMessEl.appendChild(wLMessH)
    const qHEl = document.createElement('b')
    qHEl.innerHTML = `<a class="resetbtn waves-effect waves-light btn-small">Play again?</a>`
    qHEl.addEventListener('click', init)
    winLsMessEl.appendChild(qHEl)
    spacePg.style.setProperty('display', 'none')
    outPg.style.setProperty('display', 'none')
    hmOutBtn.removeEventListener('click', chngPage)
    hmPg.style.setProperty('display', 'grid')
    choicesEl.style.setProperty('display', 'none')
    winLsMessEl.style.setProperty('display', 'flex')
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
    return val
}

function getRandomDilute(spread) {
    const randNum = Math.random() * spread.length
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
    incidAmnt = 0
    rEHappened = null
    incidentHappened = null 
    lastPgIn = null 
    exposureAtExpose = 0
    player.winLose = false
    player.health = 100
    player.mHlth = 100
    gmTime = 0
    player.money = 500
    player.food = 50
    player.meds = 60
    player.protItems = {}
    player.caution = 100
    player.exposure = 0
    zombieArr = []
    const icon = personSpace.innerHTML
    personSpace.innerHTML = ``
    personSpace = document.getElementById('s35')
    personSpace.innerHTML = icon
    winLsMessEl.style.setProperty('display', 'none')
    winLsMessEl.innerHTML = ``
    rulesD.style.setProperty('display', 'none')
    choicesEl.style.setProperty('display', 'flex')
    gmTimer = window.setInterval(upSecs, 300)
    hmPgInit()
}



