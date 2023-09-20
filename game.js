var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(event) {
    var keyChar = String.fromCharCode(event.keyCode);
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
  });

$('.btn').on('click', function(event) {
    var clickedElement = event.target;
    var userChosenColour = clickedElement.id;

    playSound(userChosenColour);
    animatedPress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level ++;
    $('h1').text('Level ' + level);
}

function playSound(name) {
    var audio = new Audio('./sounds/' + name +'.mp3');
    audio.play();
}

function animatedPress(currentColour) {
    var $element = $('#' + currentColour);
    var className = 'pressed';
  
    // Add the class
    $element.addClass(className);
  
    // Remove the class after 100 milliseconds
    setTimeout(function() {
      $element.removeClass(className);
    }, 100);
  }
;

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     console.log("success");

            if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
            nextSequence();
        }, 1000);

        }

    } else {
        var audio = new Audio('./sounds/' + 'wrong' +'.mp3');
        audio.play();
        var $element = $('body');
        var className = 'game-over';
  
        // Add the class
        $element.addClass(className);
  
        // Remove the class after 100 milliseconds
        setTimeout(function() {
            $element.removeClass(className);
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []; 
    started = false;
}