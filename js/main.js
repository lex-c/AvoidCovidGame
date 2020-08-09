let gmTime

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













//AFTER LAST PAGE

const player = {
    exposure: 0,
    context: -1,
    exposureTime: 0,
    timerCount: 0,
    expose(incident) {
        const incidAmnt = incident.exposAmnt * getRandomDilute(incident.inOutSpreadP[this.context + 1])
        this.exposure += incidAmnt
        console.log(`this exp ${incidAmnt}, total exp ${this.exposure}`)
        window.setTimeout(this.rvrsAfterTime.bind(player), 3000, incidAmnt)
        if (this.exposure >= 5000) return console.log(`caught it and total exposure was ${this.exposure}`)
    },
    rvrsAfterTime(amount) {
        console.log(amount)
        this.exposure -= amount
    }
}

const oneRiskIncident = {
    type: 'vap',
    exposAmnt: 5000,
    outSpreadP: [70, 30, 20, 20, 20, 20, 20, 20, 10, 0], 
    inSpreadP: [95, 90, 80, 80, 80, 70, 70, 60, 50, 30],
    get inOutSpreadP() {
        return [this.outSpreadP, null, this.inSpreadP]
    }
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

// class RiskEvt {
//     constructor()
// }







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
player.expose(oneRiskIncident)
window.setTimeout(() => player.expose(oneRiskIncident), 1000)
window.setTimeout(() => player.expose(oneRiskIncident), 3000)
// window.setTimeout(() => player.expose(oneRiskIncident), 6000)
// window.setTimeout(() => player.expose(oneRiskIncident), 8000)
// window.setTimeout(() => player.expose(oneRiskIncident), 10000)
// window.setTimeout(() => player.expose(oneRiskIncident), 12000)
