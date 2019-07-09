const root = document.querySelector('#app');

const generalAuthorityList = [
    'russell-m-nelson',
    'dale-g-renlund',
    'dallin-h-oaks',
    'david-a-bednar',
    'dieter-f-uchtdorf',
    'd-todd-christofferson',
    'gary-e-stevenson',
    'gerrit-w-gong',
    'henry-b-eyring',
    'jeffrey-r-holland',
    'm-russell-ballard',
    'neil-l-andersen',
    'quentin-l-cook',
    'ronald-a-rasband',
    'ulisses-soares',
];

let flippedCard;
let canFlip = true;
let numberOfMatchesMade = 0;

let cards = [];

function prepare() {
    cards = randomize([].concat(generalAuthorityList, generalAuthorityList)).map(name => {
        const element = document.createElement('div');
        element.classList.add('card');
        element.classList.add('face-down');
        const src = `assets/${name}.jpg`;
        element.innerHTML = `
            <img src="${src}" alt="${name}">
        `;
        
        const card = {
            src,
            matched: false,
            flipped: false,
            element,
            flip() {
                this.flipped = true;
                this.element.classList.add('flipped');
            },
            reset() {
                this.flipped = false;
                this.element.classList.remove('flipped');
            },
            _clickListener: () => {
                if (!canFlip || card.flipped) return;
                
                if (!card.flipped) {
                    card.flip();
                }
                
                if (!flippedCard) {
                    flippedCard = card;
                }
                else if (flippedCard.src == card.src) {
                    flippedCard = undefined;
                    numberOfMatchesMade++;
                    
                    if (numberOfMatchesMade == cards.length / 2) {
                        requestAnimationFrame(() => {
                            alert('Congratz!');
                            setTimeout(reset, 2000);
                        });
                    }
                }
                else {
                    canFlip = false;
                    setTimeout(() => {
                        flippedCard.reset();
                        card.reset();
                        flippedCard = undefined;
                        canFlip = true;
                    }, 3000);
                }
            },
        };
        
        element.addEventListener('click', card._clickListener);
        
        root.appendChild(element);
        
        return card;
    });
}

function reset() {
    flippedCard = undefined;
    canFlip = true;
    cards.forEach(card => {
        card.reset();
        card.element.removeEventListener('click', card._clickListener);
    });
    
    root.innerHTML = ``;
    
    prepare();
}

reset();

/**
 * 
 * @param {any[]} arr 
 */
function randomize(arr) {
    const copy = arr.slice();
    const newArr = [];
    
    while (copy.length) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        const [ item ] = copy.splice(randomIndex, 1);
        
        newArr.push(item);
    }
    
    return newArr;
}
