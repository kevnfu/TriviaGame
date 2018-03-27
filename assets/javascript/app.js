let totalTime, correct, incorrect, qIndex;
let timerID;
let data = [
    {q:"Which is a prime number", a:["4", "7", "15", "14"], correct:1},
    {q:"Which president served during the civil war?", a: ["George Washington", "James Madison", "Abraham Lincoln", "John Adams"], correct:2},
    {q:"Which is the Grand Canyon State", a:["AZ", "TN", "GA",  "CA"], correct:0},
]

function reset() {
    totalTime = 30;
    correct = 0;
    incorrect = 0;
    qIndex = 0;

    $("#question-section").hide();
    $("#response").hide();
    $("#timer").hide();
    $("#reset-btn").hide();
    $("#start-btn").show();
}

function countDown() {
    totalTime--;
    $("#timer").html("Time Remaining: " + totalTime);
    if(totalTime === 0) {
        gameEnd();
    }
}

function loadQuestion() {
    $("#question").html(data[qIndex].q);
    $(".answer").each((i, el) => {
        $(el).text(data[qIndex].a[i]);
    });
}

$(document).ready(function() {
    reset();

    $("#start-btn").click(function() {
        $(this).hide();
        $("#question-section").show();
        $("#timer").show();
        timerID = setInterval(countDown, 1000);

        loadQuestion();
    });

    $("#reset-btn").click(function() {
        reset();
    });
})

$(document).on("click", ".answer", function() {
    console.log($(this).data("i"));
    let ans = parseInt($(this).data("i"));
    if(ans === data[qIndex].correct) {
        correctAnswer();
    } else {
        incorrectAnswer();
    }
})

function correctAnswer() {
    $("#question-section").hide();
    $("#response").show().html("Correct!");
    correct++;
    setTimeout(newQuestion, 2000);
}

function incorrectAnswer() {
    $("#question-section").hide();
    $("#response").show().html("Incorrect. Correct answer was " + data[qIndex].a[data[qIndex].correct]);
    incorrect++;
    setTimeout(newQuestion, 2000);
}

function newQuestion() {
    qIndex++;
    console.log(qIndex + " " + data.length);
    if(qIndex >= data.length) {
        gameEnd();
        return;
    }
    $("#question-section").show();
    $("#response").hide();
    loadQuestion();
}

function gameEnd() {
    clearInterval(timerID);
    $("#question-section").hide();
    $("#response").show().html(`Game over! Correct: ${correct} Incorrect: ${incorrect}`);
    $("#reset-btn").show();
}