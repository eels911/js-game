import { createPlayer } from "./createplayers.js";
import { checkWin } from "./declareWinner.js";
import { changeHP, renderHP, elHP } from "./players.js";
import { enemyAttack, playerAttack } from "./fight.js";
import {logs} from "./generatelogs"
import {getRandomInt} from "./utils";

const $arenas = document.querySelector('.arenas');
const $form = document.querySelector('.control');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: './assets/scorpion.gif',
    weapon: [],
    attack: function () {
        console.log(player1.name + ' Fight ...');
    },
    changeHP,
    renderHP,
    elHP,
};

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: './assets/kitana.gif',
    weapon: [],
    attack: function () {
        console.log(player2.name + ' Fight ...');
    },
    changeHP,
    renderHP,
    elHP,
};

function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

function getTextLog(type,playerName1, playerName2){
    switch (type){
        case 'start':
            return LOGS[type]
                .replace('[player1]',playerName1)
                .replace('[player2]',playerName2)
                .replace('[time]', getTime());
            break;
        case 'hit':
            return logs[type][getRandomInt(logs[type].length - 1) - 1]
    }
}

function generateLogs(type, player1, player2){
    const text = getTextLog(type,player1.name,player2.name);
    console.log(text);
    const el = `<p>${text}</p>`;
    $form.insertAdjacentHTML('afterbegin', el);
}


$form.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();

    const player = playerAttack($form);

    if (enemy.defence !== player.hit) {
        player1.changeHP(player.value);
        player1.renderHP();
        generateLogs('hit', player1, player2, player.value);
    }

    if (player.defence !== enemy.hit) {
        player2.changeHP(enemy.value);
        player2.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    }

    if (player.defence === enemy.hit) {
        generateLogs('defence', player2, player1);
    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);
    }

    checkWin(player1, player2, $arenas);
})

function init(){generateLogs('start', player1, player2);
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
}
init()
