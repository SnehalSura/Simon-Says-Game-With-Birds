let gameSeq = [];
let userSeq = [];
let highScore = 0;

let started = false;
let scoreElem = document.getElementById("score");
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let level = 0;
let btns = ["cream", "pink", "tomato", "nevyBlue"];


document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        // Level up the game to 1  by using levelUp();
        setTimeout(function(){
            levelUp();
        },1000);
    
    }

});

function gameFlash(btn) {                    // Function executed to flash the button by game itself
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 300);
}

function userFlash(btn) {                   // Executed when user clicks on the button
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];      // For clearing the previous level's user sequence data
    level++;
    h2.innerText = `Level ${level}`;
    // Choose the random button
    randIdx = Math.floor(Math.random() * 4);        // generating a random index number between 0 to 3
    randColor = btns[randIdx];                      // accessing the color from the btns array
    let reqBtn = document.querySelector(`.${randColor}`);      // accessing the button element with the class = random Color
    console.log("Random class is:", randColor);      // Just for understanding of blinked button
    gameFlash(reqBtn);                               // Calling the function to blink the specific "random button"
    gameSeq.push(randColor);                      // Pushing the random color flashed by game for tracking the game order
}

function checkAns(indx) {
    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length == gameSeq.length) {   // Main condition: When the game & user array Length matches, then only next level
            setTimeout(levelUp, 1000);
        }
    }
    else {
        console.log("Game Over!");
        let score = level - 1 ;          // Calculate the user's current score
        h2.innerHTML = `<span>Game Over! Your Score was <b>${score}</b> <br> Press any key to start. </span>`;

        if (highScore < score){
            highScore = score;         // Update the high score if the current score is higher
        }

        scoreElem.innerText = highScore;
        document.body.classList.add("changeBackground");
        h1.style.color = "white";
        let mySpan = document.querySelector("span");

        mySpan.style.backgroundColor = "yellow";
        
        setTimeout(function () {
            document.body.classList.remove("changeBackground");
            h1.style.color = "black";
        }, 2000);

        resetGame();
    }
}

function btnPress() {
    if (started == true) {
        console.log("I have pressed", this);
        let pressedBtn = this;
        userFlash(pressedBtn);

        let pressed_btn_id = pressedBtn.getAttribute("id");
        userSeq.push(pressed_btn_id);

        checkAns(userSeq.length - 1);          // checking for the last index of the userSeq

    }
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
