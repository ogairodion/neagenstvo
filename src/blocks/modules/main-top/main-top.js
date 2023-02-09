import $ from "jquery";

const text = [
    'БРЕНДИНГ.\n',
    'Сайты.\n',
    'УПАКОВКА.\n'
];

let line = 0;
let count = 0;
let result = '';

function typeLine() {
    let interval = setTimeout(() => {
        result += text[line][count]
        $('.main-top__title').html(result +'|');
        count++;
        if (count >= text[line].length) {
            count = 0;
            line++;
            if (line == text.length) {
            clearTimeout(interval);
                $('.main-top__title').html(result);
            return true;
            }
        }
        typeLine();
    }, 
    getRandomInt(getRandomInt(250*1.8)))
}
typeLine();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
