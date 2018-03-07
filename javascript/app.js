    var quiz = [
                {
                    question: "Where was the first World Cup hosted?",
                    answerList: ["Brazil", "England", "Uruguay", "France"],
                    answer: 2
                }, 
                {
                    question: "What year was the first World Cup held?",
                    answerList: ["1930", "1998", "1994", "1986"],
                    answer: 0
                },
                {
                    question: "Which of the following country has not held the World Cup?",
                    answerList: ["China", "Brazil", "Italy", "Korea"],
                    answer: 0
                },
                {
                    question: "Who was the youngest player to win the World Cup?",
                    answerList: ["Ronaldo", "Pele", "Zidanne", "Xavi"],
                    answer: 1
                },
                {
                    question: "Which team has won the most World Cup?",
                    answerList: ["Spain", "Italy", "Brazil", "Argentina"],
                    answer: 2
                },
                {
                    question: "Where will the 2018 World Cup be held?",
                    answerList: ["USA", "Dubai", "Korea", "Russia"],
                    answer: 3
                },
                {
                    question: "Which player is current has the most goals in World Cup History?",
                    answerList: ["Klose", "Cristiano Ronaldo", "Messi", "Raul"],
                    answer: 0
                },

                ];
var pictures = ["question1","question2","question3","question4","question5","question6","question7"];

var playerPick;
var timeRunningBoolean;
var currentQuestion = 0;
var wrongScore;
var rightScore;
var noAnswer;
var time;
var seconds;

$("#startButton").on("click" , function(){

    $(this).hide();
    newGame();

});

$("#startOver").on("click", function(){
    $(this).hide();
    newGame();

});







function newGame(){
    currentQuestion = 0;
    wrongScore = 0;
    rightScore = 0;
    noAnswer = 0;
    $(".question").empty();
    $(".answerChoices").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $('#gif').empty();
    $('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#unanswered').empty();
    $('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#timeleft').empty();
    afterClickStart();
}


function afterClickStart(){
    $('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

    timeRunningBoolean = true; //setting state of the program, time begins to run

    $('#currentQuestion').html('Question'+' '+(currentQuestion+1)+' '+'out of'+' '+quiz.length);

    $('.question').html(quiz[currentQuestion].question); 

    for ( var i = 0; i < 4; i++){

        var multipleChoices = $("<div>").attr({"class":"choice","data-index": i});
        multipleChoices.text(quiz[currentQuestion].answerList[i]);
        $(".answerChoices").append(multipleChoices);
    }

    timerunning();

    $('.choice').on('click',function(){
        playerPick = $(this).data('index');
        clearInterval(time);
        result();
    });
    
}

function timerunning(){
    seconds = 20;
    
    timeRunningBoolean = true;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    time = setInterval(decrement,1000);

};

function decrement(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');

    if(seconds < 1){
        timeRunningBoolean = false;
        clearInterval(time);
        result();
    }


}



function result(){

    $('#currentQuestion').empty();
	$('.choice').empty();
    $('.question').empty();
    
    

    var correctChoice = quiz[currentQuestion].answerList[quiz[currentQuestion].answer];
    var correctChoiceValue = quiz[currentQuestion].answer;
    


    if(playerPick === correctChoiceValue && timeRunningBoolean === true ){

        rightScore++
        $("#message").html("Correct Answer!")
        $("#correctedAnswer").html("The correct answer is:" + ' ' +
        correctChoice);
        $("#gif").html('<img src = "./images/'+ pictures[currentQuestion] +'.gif" width = "350px">')
        }
    else if (playerPick !== correctChoiceValue && timeRunningBoolean === true){

        wrongScore++
        $("#message").html("Wrong Answer!")
        $("#correctedAnswer").html("The correct answer is:" + ' ' +
        correctChoice);
        $("#gif").html('<img src = "./images/'+ pictures[currentQuestion] +'.gif" width = "350px">')

    }
    else{
        timeRunningBoolean = true;
        noAnswer++;
        $("#message").html("No Answer was picked!");
        $("#correctedAnswer").html("The correct answer is:" + ' ' +
        correctChoice);
        $("#gif").html('<img src = "./images/'+ pictures[currentQuestion] +'.gif" width = "350px">')

    }

    if(currentQuestion == (quiz.length - 1)){
        setTimeout(finalPage,4000)
        $("#startOver").empty();

    }else{
        currentQuestion++;
        setTimeout(afterClickStart,4000);


    }



    };

function finalPage(){
    $('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html("RESULTS ARE IN!!!");
	$('#correctAnswers').html("Number of Correct Answers: " + rightScore);
	$('#incorrectAnswers').html("Number of Incorrect Answers: " + wrongScore);
    $('#unanswered').html("Unanswered: " + noAnswer);
    
    $('#startOver').show();
    var restartButton = $("<button> Start Over </button>").attr("class","btn btn-primary")
    $('#startOver').append(restartButton);

}








