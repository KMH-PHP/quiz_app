/* Global variables */
let SCORE;
let RAND_QUES;
let NUMS;

const scoreBoard = document.querySelector('.score-board');
const scoreVal = document.getElementById('score');
const questionBox = document.querySelector('.question-box');
const optionBox = document.querySelector('.option-wrapper');
const playBtn = document.querySelector('.play-btn');
const exitBtn = document.querySelector('.exit-btn');

const optionsBtns = document.querySelectorAll('.option-text');

const optionsSelection = document.querySelectorAll('#opt-btn');

function playSetup() {
    SCORE = 0;
    RAND_QUES = -1;

    playBtn.style.display = "block";
    questionBox.style.display = "none";
    optionBox.style.display = "none";
    exitBtn.style.display = "none";
    scoreBoard.style.display = "none";
    NUMS = numArray(0, 3);

}

function startGame() {
    scoreVal.innerHTML = SCORE;
    questionBox.style.display = "block";
    optionBox.style.display = "flex";
    exitBtn.style.display = "block";
    scoreBoard.style.display = "block";
    question.quizPlay();
}

playBtn.addEventListener('click', function(){
    this.style.display = "none";
    startGame();
})

exitBtn.addEventListener('click',function (){
    playSetup();
})

/*********** Question Section  */

let questionColl = [];
let optionColl = [];
const answerColl = [0,2,3,2];

/*************** questions ****** */

questionColl[0] = "Which one is the first search engine in internet?";
optionColl[0] = {
    options: ["Google", "Archie", "Altavista", "WATS"]
};

questionColl[1] = "Which one is the biggest in the world?";
optionColl[1] = {
    options: ["Lion", "Ant", "Elephant", "Tiger"]
};

questionColl[2] = "Which one is the smallest in the world?";
optionColl[2] = {
    options: ["Gorilla", "Panda", "Cat", "Chi-wa-wa"]
};

questionColl[3] = "Which one is the #FF0000?";
optionColl[3] = {
    options: ["Green", "Yellow", "Red", "Blue"]
};


/********** end of questions ***** */

let quizQuestion = function(question, optionList, correctAns) {
    this.question = question;
    this.optionList = optionList;
    this.correctAns = correctAns;
}

let question = new quizQuestion(questionColl, optionColl,answerColl);

/****************************** */

/************ generate unique random numbers for unique questions */


function numArray(start, end) {
    let numsList = [];
    for (let i = start; i <= end; i++){
        numsList.push(i);
    }
    return numsList;
}

function randValueGen(min, max){
    let temp = Math.random() * (max - min + 1);
    let result = Math.floor(temp) + min;
    return result;
}

quizQuestion.prototype.quizPlay = function() {
// To check if the questions are available or not

    
    if(NUMS.length === 0){
        document.getElementById('question').innerHTML = "You have completed the game.";
        optionBox.style.display = 'none';
        return;
    }


    let randIndex = randValueGen(0, NUMS.length - 1);
    RAND_QUES = NUMS[randIndex];

    NUMS.splice(randIndex, 1);

        // for random question dispay in the question box

    document.getElementById('question').innerHTML = this.question[RAND_QUES];

    
    // for displaying the options for the above question
    this.optionList[RAND_QUES].options.forEach(function(option, idx){
        optionsBtns[idx].innerHTML = option; 
    })

    optionsSelection.forEach(function(optionSelected, index) {
        // optionSelected.addEventListener('click',function(){
        //     console.log(`${optionSelected} ${index}`)
        // })

        optionSelected.addEventListener('click',function(){
            //answer selected by user
            let userAns = parseInt(this.textContent) - 1;
            // console.log(typeof(userAns), userAns)

            //for preventing user to click multiple times and on multiple options

            optionsSelection.forEach(function(option){
                option.disabled = true;
            })
            question.checkAnswer(userAns);

        })
    })
}
    quizQuestion.prototype.checkAnswer = function(userAns) {
        optionsSelection[userAns].style.background = "white";
        optionsSelection[userAns].style.color = "black";

        //

        //correct answer from our data collection
        let correctAns = question.correctAns[RAND_QUES];
        if(userAns === correctAns ){
            correctAnsUpdate();
        }else {
            incorrectAnsUpdate();
        }
    }


    //for correct Ansupdate
    function correctAnsUpdate() {
        document.getElementById('question').style.color = "gold";
        document.getElementById('question').innerHTML = "Correct!";
        SCORE++;
        scoreVal.innerHTML = SCORE;
        
        setTimeout(contdPlay, 1000);

    }

    //for incorrect Ansupdate
    function incorrectAnsUpdate() {
        document.getElementById('question').style.color = "red";
        document.getElementById('question').innerHTML = "Incorrect!";

        setTimeout(contdPlay, 1000);
    }

    //for continous play

    function contdPlay() {

        optionsSelection.forEach(function(option)
        {
            option.disabled = false;
            //re-enabling our disable buttons
            option.style.background = "black";
            option.style.color = "white";
        })

        document.getElementById('question').style.color = 'black';
        //to make question color white again in case the previous answer was answered incorrectly

        question.quizPlay();

    }

playSetup();

