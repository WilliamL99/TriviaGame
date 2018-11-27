$(document).ready(function() { 



var quizArea = $("#quiz");
var countStartNumber = 60;

// Questions
var questions = [{
    question: "In Gene Roddenberry's original treatment for Star Trek, what was the name of the startship?",
    answers: ["Reliant", "Enterprise", "Plymouth", "Yorktown"],
    correctAnswer: "Yorktown"
}, {
    question:"What is the name of the klingon home world?",
    answers: ["Qo\'noS", "Klingonia", "Anacreon", "Gorkon"],
    correctAnswer: "Qo\'noS"
}, {
    question: "USS enterprise bartender guinan is a memberof what long-lived species?",
    answers: ["Haakonian", "Denobulan", "El-Aurian", "Human/Terran"],
    correctAnswer: "El-Aurian"
}, {
    question: "What is the principle of starfleet's 'Prime Directive'?",
    answers: ["Diplomancy and nonviolence", "Non-Intervention", "Providing Assistance to those in need", "Exploration and scientific study"],
    correctAnswer: "Non-Intervention"
}, {
    question: "Hikaru Sulu held which position for the longest period of time abord the USS Enterprise?",
    answers: ["Helmsman", "Chief Engineer", "Science Officer", "Communication Officer"],
    correctAnswer: "Helmsman"
}, {
    question: "What is the purpose of the Vulcan ritual of Kolinahr?",
    answers: ["A purgin of emotion", "The temporary union of two minds", "sexual release and mating", "The transfer of one\'s consciousness into the body of another"],
    correctAnswer: "A purging of emotion"
}];

var timer;

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").text(game.counter);
        if (game.counter === 0) {
            console.log ("Time Up");
            game.timeUp();
        }

    },

    loadQuestion: function() {
        timer = setInterval (game.countdown, 1000);

        quizArea.html ("<h2>" + questions[game.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            quizArea.append("<button class='answer' id='answer' data-name=''" + questions[game.currentQuestion].answers[i] + "> " + questions[game.currentQuestion].answers[i] + "</button>");

        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        clearInterval(timer);
        $("#counter-number").html(game.counter);

        quizArea.html("<h2>Out of Time</h2>");
        quizArea.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer);

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 5 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 5 * 1000);
        }
    },

    results: function() {
        clearInterval(timer);
        quizArea.html("<h2>All done, heres how you did!</h2>");
        $("#counter-number").text(game.counter);

        quizArea.append("<h3>Correct Answers: " + game.correct + "</h3>");
        quizArea.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        quizArea.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        quizArea.append("<br><button id='start-over'>Start Over</button>");
    },

    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        }
        else {
            game.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        quizArea.html("<h2>Nope!</h2>");
        quizArea.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer +"</h3>");

        if (game.currentQuestion === questions.length -1) {
            setTimeout(game.results, 5 * 1000);
        } 
        else {
            setTimeout(game.nextQuestion, 5 * 1000);
        }
    },

    answeredCorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        quizArea.html("<h2>Correct!</h2>");
        
        if (game.currentQuestion ===questions.length -1) {
            setTimeout(game.results, 5 * 1000);
        } 
        else {
            setTimeout(game.nextQuestion, 5 * 1000);
        }
    },

    reset: function () {
        game.currentQuestion = 0;
        game.counter = countStartNumber;
        game.correct = 0;
        game.incorrect = 0;
        game.loadQuestion(); 
    }
};

$(document).on("click", "#start", function() {
    game.reset();
});
      
$(document).on("click", "#answer", function(e) {
    game.clicked(e);
});
      
$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2 >Time Remaining: <span id='counter-number'>60</span> Seconds</h2>");
    game.loadQuestion();
});

$(document).on("click", "#start-over", function() {
    game.reset();
});

})

