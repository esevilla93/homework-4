var questions = [
    // question 1 created below
    {
        title: "<strong>Question 1:</strong> What is the importance of Doctype in HTML",
        choices: ["Doctype adds cosmetic effects to the webpage.", "Doctype creates a webpage more accesible.",
            "Doctype tells the browser which version of HTML/XHTML standard is used and how to render the page."],
        answer: "Doctype tells the browser which version of HTML/XHTML standard is used and how to render the page."
    },
    // question 2
    {
        title: "<strong>Question 2:</strong> What are data – attributes ",
        choices: ["Data-attributes are used to name classes.", "Data-attributes can create new classes within an existing class.",
            "Data – attributes are used to store custom data directly inside HTML tags. They are easily-accessible from CSS and JavaScript."],
        answer: "Data – attributes are used to store custom data directly inside HTML tags. They are easily-accessible from CSS and JavaScript."
    },
    // question 3
    {
        title: "<strong>Question 3:</strong> What is 'this' keyword in JavaScript?",
        choices: ["This keyword refers to the object from where it was called.", "This keyword refers to the element where it has been assigned.",
            "This keyword refers to the elemnt above the 'this' statement."],
        answer: "This keyword refers to the object from where it was called."
    },
    // question 4
    {
        title: "<strong>Question 4:</strong> What are all the looping structures in JavaScript?",
        choices: ["For, Else, Do-while loops.", "Else, If, For", "For, While, Do-while loops."],
        answer: "For, While, Do-while loops."
    },
    // question 5
    {
        title: "<strong>Question 5:</strong> What is an undefined value in JavaScript?",
        choices: ["A variable assigned to a value.", "The variable in the code doesn't exist",
            "A value equal to zero."],
        answer: "The variable in the code doesn't exist"
    },
    // question 6
    {
        title: "<strong>Question 6:</strong> What does DOM stand for?",
        choices: ["Document Object Model", "Deployment Object Method", "Deployed Object Model"],
        answer: "Document Object Model"
    },
    // question 7
    {
        title: "<strong>Question 7:</strong> You call a ____ to run a task/procedure.",
        choices: ["object", "function", "constant"],
        answer: "function"
    }
];

function initTest() {
    var timeLeft = 0;

    var numQuestions = questions.length;
    var startTest = document.getElementById("start-button");
    var finalScoreEl = document.getElementById("final-score");
    var timeEl = document.getElementById("time-left");
    var bodyContainer = document.getElementById("body-container");
    var testContainer = document.getElementById("test-container");
    var highscoreContainerEl = document.getElementById("highscore-container");
    var highscoreButtonEl = document.getElementById("highscore-button");
    var finalContainerEl = document.getElementById("final-container");
    var submitButtonEl = document.getElementById("submit-init");
    var clearHighScore = document.getElementById("clearHighScore");

    function beginQuiz() {


        bodyContainer.setAttribute("class", "container d-none");
        testContainer.setAttribute("class", "container");
        var newRow = null;
        var colTwo = null;
        var newHeader = null;
        var buttonEl = null;
        var currentQuestion = 1;
        var score = 0;
        timeLeft = numQuestions * 15;
        timeEl.setAttribute("value", timeLeft);


        var myInterval = setInterval(function () {
            if (timeLeft < 1) {
                clearInterval(myInterval);
                testContainer.setAttribute("class", "container d-none");
                finalContainerEl.setAttribute("class", "container d-none");
                return;
            }
            timeLeft = timeLeft - 1;
            timeEl.setAttribute("value", timeLeft);
        }, 1000);
        var clickTimeout = false;
        function createQuestion(questionNum) {
            testContainer.innerHTML = "";
            newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            testContainer.append(newRow);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-0 col-sm-2");
            newRow.append(colTwo);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-12 col-sm-8");
            newRow.append(colTwo);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-0 col-sm-2");
            newRow.append(colTwo);

            colTwo = newRow.children[1];
            newRow = document.createElement("div");
            newRow.setAttribute("class", "row mb-3");
            colTwo.append(newRow);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-12");
            newRow.append(colTwo);

            newHeader = document.createElement("h2");
            newHeader.innerHTML = questions[questionNum - 1].title;
            colTwo.append(newHeader);

            colTwo = testContainer.children[0].children[1];
            for (var i = 0; i < 3; i++) {
                var newRow = document.createElement("div");
                newRow.setAttribute("class", "row mb-1");
                colTwo.append(newRow);

                var colThree = document.createElement("div");
                colThree.setAttribute("class", "col-12");
                newRow.append(colThree);
                buttonEl = document.createElement("button");
                buttonEl.setAttribute("class", "btn btn-primary");
                buttonEl.setAttribute("type", "button");
                buttonEl.innerHTML = questions[currentQuestion - 1].choices[i];
                colThree.append(buttonEl);
                buttonEl.addEventListener("click", function () {

                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(myInterval);
                    var colTwo = testContainer.children[0].children[1];
                    var newRow = document.createElement("div");
                    newRow.setAttribute("class", "row border-top");
                    colTwo.append(newRow);

                    colTwo = document.createElement("div");
                    colTwo.setAttribute("class", "col-12");
                    newRow.append(colTwo);

                    var highscoreEl = document.createElement("p");
                    colTwo.append(highscoreEl);
                    if (this.innerHTML === questions[currentQuestion - 1].answer) {
                        highscoreEl.innerHTML = "Correct!";
                    } else {
                        highscoreEl.innerHTML = "Incorrect";
                        timeLeft = timeLeft - 10;
                        if (timeLeft < 0) {
                            timeLeft = 0;
                        }
                        timeEl.setAttribute("value", timeLeft);
                    }
                    currentQuestion++;
                    if (currentQuestion > questions.length) {
                        score = timeLeft;
                    }

                    setTimeout(function () {
                        if (currentQuestion > questions.length) {
                            testContainer.setAttribute("class", "container d-none");
                            finalContainerEl.setAttribute("class", "container");
                            finalScoreEl.setAttribute("value", score);
                        } else {
                            createQuestion(currentQuestion);
                            clickTimeout = false;
                            myInterval = setInterval(function () {
                                if (timeLeft < 1) {
                                    clearInterval(myInterval);
                                    testContainer.setAttribute("class", "container d-none");
                                    finalContainerEl.setAttribute("class", "container");
                                    return;
                                }
                                timeLeft = timeLeft - 1;
                                timeEl.setAttribute("value", timeLeft);
                            }, 1000);
                        }
                    }, 1500);
                });
            }


        }
        function saveScore() {
            var initialsEl = document.getElementById("initials-entry");
            var highScores = JSON.parse(window.localStorage.getItem("scores"));
            var newHighScore = {
                initials: initialsEl.value,
                highScore: score
            };
            console.log(newHighScore);
            highScores.innerHTML(newHighScore);
            console.log(highScores);
            localStorage.setItem("scores", JSON.stringify(highScores));
            window.addEventListener("click", function () { saveScore() });

        }
        function clearScore() {
            clearHighScore.addEventListener("click", function () {
                localStorage.removeItem("highscores");
                window.location.reload();
            });



        }
        submitButtonEl.addEventListener("click", saveScore);
        clearHighScore.addEventListener("click", clearScore);
        createQuestion(currentQuestion);
    }
    startTest.addEventListener("click", beginQuiz);

    highscoreButtonEl.addEventListener("click", function () {
        bodyContainer.setAttribute("class", "container d-none");
        testContainer.setAttribute("class", "container d-none");
        finalContainerEl.setAttribute("class", "container d-none");
        highscoreContainerEl.setAttribute("class", "container");
        var colTwo = document.getElementById("highscore-table");

        for (i = 0; i < highScores.length; i++) {
            var newRow = document.createElement("div");
            newRow.setAttribute("class", "row mb-1");
            colTwo.append(newRow);

            var colThree = document.createElement("div");
            colThree.setAttribute("class", "col-12 text-center");
            newRow.append(colThree);

            var highscoreEl = document.createElement("div");
            highscoreEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
            colThree.append(highscoreEl);

        }
    });

}

initTest();