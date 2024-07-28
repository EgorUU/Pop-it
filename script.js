const circle = document.querySelectorAll('.circle')
const audio = new Audio('20240723_220954 (mp3cut.net).mp3')
const button = document.querySelector('button')
const wrapper = document.querySelector('.wrapper')

circle.forEach((c) => {
    c.addEventListener('click', () => {
        if (button.style.display == 'none') {
            const end = getComputedStyle(c).backgroundColor
            if (end == 'rgb(224, 144, 69)') {
                const header = document.createElement('h1');
                header.className = 'header';
                wrapper.prepend(header)
                header.textContent = 'Вы Проиграли!';
                button.style.display = 'block';
                count = 2
                roundCnt = 0
                level = 0
                numberClicks = 0
                circle.forEach((c) => {
                    c.classList.remove('active')
                    c.style.backgroundColor = 'rgb(224, 144, 69)'
                })
                button.addEventListener('click', () => {
                    header.remove()
                })
            }
            numberClicks++;
        }
        if (!c.classList.contains('active')) {
            audio.play()
        }
        c.classList.add('active');
        if (numberClicks == count) {
            roundCnt++;
            if (roundCnt == 4) {
                level++;
                switch (level) {
                    case 1:
                        count = 3;
                        break;
                    case 2:
                        count = 4;
                        break;
                    case 3: 
                        count = 5;
                        break;
                }
                roundCnt = 0;
            }
            numberClicks = 0;
        }
    })
    
})
document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        circle.forEach((c) => {
            c.classList.remove('active')
            c.style.backgroundColor = 'rgb(224, 144, 69)'
        })
        if (button.style.display == 'none') {
            round()
        }
    }
})

// Обьявление переменных

let count = 2
let roundCnt = 0
let level = 0
let numberClicks = 0
let warningText = true


button.addEventListener('click', () => {
    round();
    button.style.display = 'none'
    if (warningText) {
        const warning = document.createElement('h1');
        warning.className = 'warning';
        warning.textContent = 'Для Возобновления Поп-ит Нажмите Пробел'
        wrapper.prepend(warning);
        setTimeout(() => {
            warning.remove();
            warningText = false
        }, 6000)
    }
})

// Функция раунда

function round() {
    setTimeout(() => {
        let randomNumbers = [];
        while (randomNumbers.length <= count) {
            let random = Math.floor(Math.random() * (circle.length - 0)) + 0
            if (!randomNumbers.includes(random)) {
                circle[random].style.backgroundColor = 'red';
                randomNumbers.push(random)                
            }
            if (randomNumbers.length === count) {
                break;
            }

        }
    }, 1000)
}
