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
const allDivs = document.querySelectorAll('.hm-pg-div')
const healthEl = document.getElementById('health')
const mHlthEl = document.getElementById('mHlth')
const foodEl = document.getElementById('food')
const timeEl = document.getElementById('time')
const moneyEl = document.getElementById('money')
const choicesEl = document.getElementById('choices')
const protItemsEl = document.getElementById('protItems')
const medsEl = document.getElementById('meds')
const hmOutDiv = document.getElementById('hmOutDiv')

function hmPgInit() {
    hmPgDispInit()
}

function hmPgDispInit() {
    healthEl.innerHTML = `Health: ${100}`
    mHlthEl.innerHTML = `Mental Health: ${100}`
    foodEl.innerHTML = `Food: ${10}`
    moneyEl.innerHTML = `Cash: $${500}`
    protItemsEl.innerHTML = `notsure`
    medsEl.innerHTML = `maybe`
}










function init() {
    hmPgInit()
}

init()