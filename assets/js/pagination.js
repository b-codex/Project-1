const p = document.querySelector('.p')
const cards = document.querySelector('.row').children

const prev_div = document.createElement('div')
const next_div = document.createElement('div')

p.appendChild(prev_div)
p.appendChild(next_div)

p.style.display.background = 'red'
p.style.display.width = '100vw'

prev_div.classList.add('prev')
next_div.classList.add('next')

const prev = document.querySelector('.prev')
prev.innerHTML = "Previous"
const next = document.querySelector('.next')
next.innerHTML = "Next"

const maxItems = 10
let index = 1

prev.addEventListener('click', () => {
    index--
    check()
    show()
})

next.addEventListener('click', () => {
    index++
    check()
    show()
})

const pg = Math.ceil(cards.length / maxItems)

function check() {
    if (index == pg) {
        // next.classList.add('disabled')
    }
    else{
        next.classList.remove('disabled')
    }

    if (index == 1) {
        // prev.classList.add('disabled')
    }

    else{
        prev.classList.remove('disabled')
    }
}

function show() {

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('show')
        cards[i].classList.add('hide')

        if ((i >= index * maxItems) - maxItems && i < index * maxItems) {
            cards[i].classList.remove('hide')
            cards[i].classList.add('show')
        }
    }

}

window.onload = () => {

    show()
    check()
}