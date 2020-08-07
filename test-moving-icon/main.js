let divIds = ['01', '04', '10', '11', '12', '13', '14', '15', '21', '24', '31', '34']

let iconSpace = document.querySelector("#d11")

const inp = document.querySelector("#moveinp")
const btn = document.querySelector("button")

btn.addEventListener('click', move)

function move() {
    const dirNum = inp.valueAsNumber
    const moves = [1, 2, 3, 4]
    if (!moves.includes(dirNum)) return
    let newSpaceId;
    if (dirNum === 1) {
        const newSpaceStrArr = iconSpace.className.slice(0, 2).split('')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) - 1}`, newSpaceStrArr[1]].join('')
    }
    if (dirNum === 2) {
        const newSpaceStrArr = iconSpace.className.slice(3, 5).split('')
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) + 1}`].join('')
    }
    if (dirNum === 3) {
        const newSpaceStrArr = iconSpace.className.slice(6, 8).split('')
        newSpaceId = [`${parseInt(newSpaceStrArr[0]) + 1}`, newSpaceStrArr[1]].join('')
    }
    if (dirNum === 4) {
        const newSpaceStrArr = iconSpace.className.slice(9, 11).split('')
        newSpaceId = [newSpaceStrArr[0], `${parseInt(newSpaceStrArr[1]) - 1}`].join('')
    }
    const icon = iconSpace.innerHTML
    iconSpace.innerHTML = ''
    getNodeOrNum(newSpaceId).innerHTML = icon
    iconSpace = getNodeOrNum(newSpaceId)
}

// function generatePopUpIcon() {
//     if (!document.querySelector('.popupicon')) return

// }

let intervalConsole = window.setInterval(consoleIt, randomTime(10000))

function consoleIt() {
    window.clearInterval(intervalConsole)
    const iconIndex = divIds.indexOf(getNodeOrNum(iconSpace))
    if (iconIndex >= 0) divIds.splice(iconIndex, 1)
    const numPicked = Math.floor(Math.random() * divIds.length)
    console.log('num picked for nodes arr', numPicked)
    const randomNodeNum = divIds[numPicked]
    console.log('random node picked', randomNodeNum)
    const num1 = Math.abs(randomNodeNum.split('')[0])
    const num2 = Math.abs(randomNodeNum.split('')[1])
    const iconNum1 = Math.abs(getNodeOrNum(iconSpace).split('')[0])
    const iconNum2 = Math.abs(getNodeOrNum(iconSpace).split('')[1])
    if (Math.abs(num1 - iconNum1) + Math.abs(num2 - iconNum2) === 1) return getNodeOrNum(randomNodeNum).innerHTML = 'X'
    intervalConsole = window.setInterval(consoleIt, randomTime(10000))
}

function randomTime(timeBase) {
    const val = Math.floor(Math.random() * timeBase + 1)
    console.log('random time int', val)
    return val
}


function getNodeOrNum(numOrNode) {
    const val = isNaN(numOrNode) ? numOrNode.id.slice(1) : document.querySelector(`#d${numOrNode}`)
    return val
}


