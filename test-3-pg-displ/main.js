const p1Div = document.getElementById('pg1')
const p2Div = document.getElementById('pg2')
const p3Div = document.getElementById('pg3')

const p1Btn = document.getElementById('p1Btn')
const p2Btn = document.getElementById('p2Btn')
const p3Btn = document.getElementById('p3Btn')

p1Btn.addEventListener('click', nxtPg1)
p2Btn.addEventListener('click', nxtPg2)
p3Btn.addEventListener('click', nxtPg3)

function nxtPg1() {
    p1Div.style.setProperty('display', 'none')
    p2Div.style.setProperty('display', 'flex')    
}
function nxtPg2() {
    p2Div.style.setProperty('display', 'none')
    p3Div.style.setProperty('display', 'flex')    
}
function nxtPg3() {
    p3Div.style.setProperty('display', 'none')
    p1Div.style.setProperty('display', 'flex')    
}
