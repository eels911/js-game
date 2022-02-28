const $arenas = document.querySelector('.arenas');
 const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: './assets/scorpion.gif',
    weapon: ['sword', 'shuriken', 'spear'],
    attack: function () {
        console.log(this.name + ', Fight...')
    },
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP


}

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: './assets/kitana.gif',
    weapon: ['sword', 'spear'],
    attack: function () {
        console.log(this.name + ', Fight...')
    },
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP
}

function createElement(element, classname) {
    const $elem = document.createElement(element);
    if (classname)
        $elem.classList.add(classname);
    return $elem;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

function createPlayer(playerObj) {


    const $player = createElement('div', 'player' + playerObj.player);

    const $progressbar = (createElement('div', `progressbar`));

    const $character = createElement('div', 'character',);
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${playerObj.hp}%`;
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    return $player

}

// function changeHP(player){
//   //  const $playerLife = document.querySelector('.player'+ player.player+' .life');
//     player.hp -= getRandom(20);
//     if(player.hp <= 0) {
//         player.hp = 0
//         // $randomButton.disabled = true
//         // $arenas.appendChild(playerWins(player.name));
//     }

function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}
function changeHP(damage) {
    //  const $playerLife = document.querySelector('.player'+ player.player+' .life');
     this.hp -= damage;
     console.log(this.name + ': ' + this.hp)
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function renderHP(){
    return this.elHP().style.width = this.hp + '%';
}


function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = name + ' wins';
    } else {
        $winsTitle.innerText = 'draw';
    }
    return $winsTitle
}
function createReloadButton(){
    const $reloadDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button','button');
    $reloadButton.innerText = 'Reload';
    $reloadButton.addEventListener('click',function (){
        window.location.reload()
    })

    $reloadDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButton)
}
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

// $randomButton.addEventListener('click', function () {
//     console.log('####: ',);
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//     player1.renderHP();
//     player2.renderHP();
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp === 0 && player2.hp == 0) {
//         $arenas.appendChild(playerWins())
// }
// })

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1]
     return{
        value: getRandom(HIT[hit]),
         hit,
         defence,
     }
}

function playerAttack(){
    const attack = {};
    for (let item of $formFight){
        // console.dir(item)
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
}

$formFight.addEventListener('submit', function (e){
    e.preventDefault();
    console.dir($formFight);
    const enemy = enemyAttack();
    const player = playerAttack()
    console.log('####: enemy', enemy);


    if (enemy.defence !== player.hit) {
        player1.changeHP(player.value);
        player1.renderHP();
    }

    if (player.defence !== enemy.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
    }

    showResult();
    console.log('####: a',player);
    console.log('####: a', enemy);
})
