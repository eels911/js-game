const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

function generateLogs(type,player1,player2){
    // const text = logs[type][0].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    // console.log(text)
    // const el = `<p>${text}</p>`;
    // $chat.insertAdjacentHTML('afterbegin',el);
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const randomNum = logs[type].length - 1;
    let text = '';
    switch (type){
        case 'start':
            text = logs['start'].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]',player2.name);
            break;
        case 'defence':
            text = `${time} - ${logs['defence'][getRandom(randomNum)].replace('[playerKick]',player1.name).replace('[playerDefence]', player2.name)}`;
            break;
        case 'hit':
            text = `${time} - ${logs['hit'][getRandom(randomNum)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)} - ${100 - player1.hp} [${player1.hp}/100]`;
            break;
        case 'end':
            text = logs['end'][getRandom(randomNum)].replace('[playerWins]',player1.name).replace('[playerLose]', player2.name);
            break;
        case 'draw':
            text = logs['draw'];
    }
    const p = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', p);

}

$formFight.addEventListener('submit', function (e){
    e.preventDefault();
    console.dir($formFight);
    const enemy = enemyAttack();
    const player = playerAttack();
    console.log('####: enemy', enemy);


    if (enemy.defence !== player.hit) {
        player1.changeHP(player.value);
        player1.renderHP();
        generateLogs('hit', player2,player1);
    }

    if (player.defence !== enemy.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
        generateLogs('hit',player1,player2);
    }

    showResult();
    console.log('####: a',player);
    console.log('####: a', enemy);
})

generateLogs('start', player1, player2);
