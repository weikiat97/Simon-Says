var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"]; 

$(document).keypress(function() {
    if (!gameStarted) {
        nextSequence();
        $("#level-title").text("Level " + level);
        gameStarted = true;
    }
    
})
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let generatingPatterns = setInterval(generateRandomPatterns, 500);
    var totalTime = level * 500;
    setTimeout(function() {
        clearInterval(generatingPatterns);
    }, totalTime + 1);
}

function generateRandomPatterns() {
    console.log("Level: " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    var mostRecentColour = userClickedPattern[currentLevel - 1];
    var correctColour = gamePattern[currentLevel - 1];
    if (mostRecentColour == correctColour) {
        if (currentLevel == level) {
            gamePattern = [];
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key To Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}
    

$(".btn").click(function(event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    var currentLevel = userClickedPattern.length;
    checkAnswer(currentLevel);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

