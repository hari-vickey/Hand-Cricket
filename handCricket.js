// Hand Cricket JavaScript Code

// Declaring Constants for HTML elements
// Display Boxes
const introBox = $(".intro-box");
const menuBox = $(".menu-box");
const rulesBox = $(".rules-box");
const tossBox = $(".toss-box");
const gameBox = $(".game-box");
const messageBox = $(".message-box");
const footerBox = $(".footer-box");
const boxArray = [introBox, menuBox, rulesBox, tossBox, gameBox];

// Buttons
const tryButton = $(".try-btn");
const newGameButton = $(".new-btn");
const guideButton = $(".guide-btn");
const exitButton = $(".exit-btn");
const menuButton = $(".menu-btn");
const backButton = $(".back-btn");
const allButtons = $(".button");

// Images
const playerImage = $(".player");
const computerImage = $(".computer");
const batButton = $(".bat-btn");
const bowlButton = $(".bowl-btn");
const handImage = $(".img-box");

// Cards
const statusCard = $(".status-card");
const updateCard = $(".update-card");

const message = $(".message");
const maxWicket = 3;

// Declaring Variables
var playerNumber = 0, randomNumber = 0, score = 0,
    wicket = 0, start = 0;

var batFirst = true, chase = false, batting = true,
    complete = false, draw = false, win = false;

// Function to update score on score card
function scoreUpdate(number) {
  score += number;
  scoreBoard = "Score: " + score + "/" + wicket;
  updateCard.text(scoreBoard);
  if( chase === true ) {
    updateCard.text(scoreBoard + " Target: " + target);
  }
  var bat = new Audio("sounds/bat.mp3");
  bat.play();
}

// Function to check if it is a wicket
function isWicket(n1, n2) {
  if( n1 === n2 && wicket !== maxWicket ){
    message.text("Wicket");
    popUp(messageBox, 500);
    wicket += 1;
    var out = new Audio("sounds/wicket.mp3");
    out.play();
    return 0;
  }
  else {
    if( batting == true ) return n1;
    else return n2;
  }
}

// Function isInnings to update the innings
function isInnings() {
  if( wicket === maxWicket ) {
    if( batFirst ) {
      statusCard.text("Bowling");
      batting = false;
    }
    else statusCard.text("Batting");
    if( !batFirst ) batting = true;
    updateCard.text("Score:0/0 Target: " + score);
    target = score; score = 0; wicket = 0; chase = true;
  }
}

// Function to Print Result on Screen
function printResult() {
  if ( draw ) {
    statusCard.text("Draw");
    message.text("Match Tied");
  }
  else {
    if( win ) {
      statusCard.text("You Won");
      message.text("Victory");
    }
    else {
      statusCard.text("You Lost");
      message.text("Defeat");
    }
  }
  if( draw || win ) {
    var clap = new Audio("sounds/clap.mp3");
    clap.play();
  }
  complete = true;
  popUp(messageBox, 2000);
  // Return to Main Screen
  setTimeout( () => { fadeInOut(gameBox, menuBox);}, 3000);
}

// Function Check the Match Result
function matchResult() {
  if( wicket === maxWicket ) {
    if( score < target ) {
      if( batting ) win = false;
      else win = true;
    }
    else if( score === target ) {
      draw = true;
    }
    printResult();
  }
  else if( score > target ){
    if( batting ) win = true;
    else win = false;
    printResult();
    complete = true;
  }
}

// Function to play Hand Cricket
function gameTask(n1, n2) {
  if( !chase ) {
    scoreUpdate(isWicket(n1, n2));
    isInnings();
  }
  else {
    scoreUpdate(isWicket(n1, n2));
    matchResult();
  }
}

// Update Image
function updateImage(number) {
  if( !complete ) {
    var source = "images/" + number + ".png";
    playerImage.attr("src", source);
    // For Computer Updating a Random Number
    randomNumber = Math.ceil(Math.random()*6);
    source = "images/" + randomNumber + ".png";
    computerImage.attr("src", source);
    // Function Call
    gameTask(number, randomNumber);
  }
}

// Function Reset
function reset(){
  playerNumber = 0; randomNumber = 0; score = 0; wicket = 0; start = 0;
  batFirst = true; draw = false; batting = true;
  complete = false; win = false; chase = false;
  updateCard.text("Score:0/0 Target: " + score);
  statusCard.text("Ready");
}

// Function Pop Up Messages
function popUp(object, duration) {
  setTimeout(( () => {object.toggle()}), duration);
  object.toggle();
}

// Function fadeInOut
function fadeInOut(object1, object2) {
  setTimeout(() => {object1.css("opacity", "0")}, 300);
  // Toggle Display Hide/show
  object1.toggle();
  object2.toggle();
  setTimeout(() => {object2.css("opacity", "1")}, 300);
}

boxArray.forEach(element => {
  element.css("opacity", "0");
});

// Show Intro Box and Footer Box
introBox.css("opacity", "1");
introBox.toggle();
footerBox.toggle();

// Give it a Try? Event Listener
tryButton.on("click", () => {
  fadeInOut(introBox, menuBox);
});

// New Game Button Event Listener
newGameButton.on("click", () => {
  reset();
  fadeInOut(menuBox, tossBox);
});

// Batting First Event Listener
batButton.on("click", () => {
  fadeInOut(tossBox, gameBox);
  statusCard.text("Batting");
});

// Bowling First Event Listen
bowlButton.on("click", () => {
  fadeInOut(tossBox, gameBox);
  batFirst = false; batting = false;
  statusCard.text("Bowling");
});

// Show Rules Pages
guideButton.on("click", () => {
  fadeInOut(menuBox, rulesBox);
  footerBox.toggle();
});

// Back Button Event Listener
backButton.on("click", () => {
  fadeInOut(rulesBox, menuBox);
  footerBox.toggle();
});

// Exit Button Event Listener
// Navigate to IntroBox
exitButton.on("click", () => {
  reset();
  fadeInOut(menuBox, introBox);
});

// Menu Button Event Listener
menuButton.on("click", () => {
  fadeInOut(gameBox, menuBox);
});

// Creating Listeners for all the Hand Image Buttons
handImage.on("click", (event) => {
  // Updating the Player Image to the corresponding Number Image
  updateImage(Number(event.target.alt));
});

// Detect KeyPress
$(document).on("keydown", function(event) {
  if( Number(event.key) < 7 ) updateImage(Number(event.key));
});

// Add Sound to all buttons
allButtons.on("click", () => {
  var click = new Audio("sounds/click.mp3");
  click.play();
});