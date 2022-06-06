let input = document.querySelector('input');
let rules;
let arr = [];
let control = 0;
function iteration(){
    arr.push(rules[control]);
    console.log(arr)
    document.querySelector('p').innerHTML = arr.join('');
    control++;
    if(control == rules.length) {
        clearInterval(interval);
        setTimeout(startGame, 3000);
    }
};
function startGame(){
    document.querySelector('.container').classList.add('container_hidden');
    document.querySelector('.gameBox').classList.add('gamebox_show');
};
function printRules(){
    let playerName = input.value;
    if(playerName == ''){
        alert('Заполните поле ввода');
    } else{
        rules = `Здравствуйте ${playerName}. Здесь будут правила игры`; 
        input.classList.add('container_hidden');
        document.querySelector('button').classList.add('container_hidden');
        interval = setInterval(iteration, 100);
    }
};


let items = document.querySelectorAll('.item');
let firstCard, secondCard;
let firstCheck = true;
let cardActive = true;
let openCards = 0;
let audioWin = document.createElement('audio');
audioWin.setAttribute('src', 'audio/audioWin.mp3');
let audioError = document.createElement('audio');
audioError.setAttribute('src', 'audio/audioError.mp3');
let time = 0;
let start = true;
function randomCards(){
    items.forEach(card =>  {
        let randomNumber = Math.floor(Math.random()*12);
        card.style.order = randomNumber;
    });
};
randomCards();
function flipCard () {
    let item = event.target.parentElement;
    if(item.classList.contains('flip') == false && cardActive == true) {
        item.classList.add('flip');
        if(start == true){
            timer();
            start = false;
        } 
        if (firstCheck == true) {
            firstCard = item;
            firstCheck = false;
        } else {
            secondCard = item;
            firstCheck = true;
            if (firstCard.dataset.education == secondCard.dataset.education) {
                console.log('ладно');
                openCards++;
                if(openCards == 6){
                    setTimeout(win, 1000);
                }
            } else {
                cardActive = false;
                setTimeout(flipBack, 1000);
            }
        }
    } else{
        audioError.play();
    }
};
function flipBack(){
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    cardActive = true;
};
function win(){
    audioWin.play();
    alert(playerName + ' поздравляю! Вы выиграли.' + '\n' + 'Ваше время: ' + time);
};
function timer(){
    if(openCards != 6){
        time++; 
        console.log(time);
        setTimeout(timer, 1000);
    }
};
items.forEach(card =>  card.addEventListener('click', flipCard));