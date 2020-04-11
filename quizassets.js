const appState={
    counter:0,
    correct:0,
    incorrect:0,
    name:'',
    quizno: '',
    selectedAnswer:'',
    correctAnswerForCurrentQuestion:'',
    feedback:'',
    quizLength:0,
    timePassed:0,
    currentScore:0,
    clock:"",
    completedTime:""
    
}
const time =0;
document.addEventListener('DOMContentLoaded', () =>{
    

})
let getQuiz= async(url) =>{
    
        if(appState.quizno=="quiz1")
        {
            const response= await fetch("https://my-json-server.typicode.com/mmmnice/indiv_project_db/" +appState.quizno)
            const result = await response.json();
            console.log(result);
            appState.currentScore=(appState.correct/appState.quizLength)*100;
            appState.quizLength=result.length;
            console.log(appState.quizLength);
            generateQuiz(result);
            // if(appState.counter==0)
            // {
            //     setInterval(setTime, 1000);
            // }
        }
        else if(appState.quizno == "quiz2")
        {
            const response= await fetch("https://my-json-server.typicode.com/mmmnice/indiv_project_db2/" +appState.quizno)
            const result = await response.json();
            console.log(result);
            appState.currentScore=(appState.correct/appState.quizLength)*100;
            appState.quizLength=result.length;
            console.log(appState.quizLength);
            generateQuiz(result);
            // if(appState.counter==0)
            // {
            //     setInterval(setTime, 1000);
            // }
        }
        //const response= await fetch("https://my-json-server.typicode.com/mmmnice/indiv_project_db/" +appState.quizno)
        
}

function getinformation(){
    var name=document.getElementById('name').value;
    var quiz=document.getElementById('quizField').value;
    

    appState.name=name;
    appState.quizno=quiz;
    console.log(appState);
    getQuiz();
   // generateQuiz(thequiz);

}
function generateQuestion(data){
    console.log(data.answer)
    let what = appState.currentScore.toFixed(2);
    //console.log(appState.correctAnswerForCurrentQuestion)
    console.log(data)
    if(data.type=="multiple choice")
    {
        quiz_question = 
        `<h3>${data.question}</h3>
        <form id = "quiz_answer_form">
            <input type="radio" value = "${data.choices[0]}" name = "answer"></input>
            <label for = "answer1"> ${data.choices[0]} </label><br>
            <input type="radio" value = "${data.choices[1]}" name = "answer"></input>
            <label for = "answer2"> ${data.choices[1]} </label><br>
            <input type="radio" value = "${data.choices[2]}" name = "answer"></input>
            <label for = "answer3"> ${data.choices[2]} </label><br>
            <input type="radio" value = "${data.choices[3]}" name = "answer"></input>
            <label for = "answer4"> ${data.choices[3]} </label><br>
            <input type = "submit" value = "submit"></input>
           
        </form>
        <br>
        Score:${what}%`
        
    }
    
    else if(data.type== "short answer")
    {
        quiz_question =
        `<h3> ${data.question}</h3>
        <form id= "quiz_answer_form">
        <input type= "text" name ="answer">
        <input type="submit" value="submit">
        </form>
        <br>
        Score:${what}%`

    }
    else if(data.type == "true false")
    {
        quiz_question=
        `<h3> ${data.question} </h3>
        <form id= "quiz_answer_form">
        <input type = "radio" value = "true" name = "answer"> True</input><br>
        <input type = "radio" value = "false" name ="answer"> False </input>
        <input type = "submit" value= "submit">
        </form>
        <br>
        Score:${what}%`
    }
    else if(data.type == "fill in the blank")
    {
        quiz_question=
        `<h3> ${data.question} </h3>
        <form id = "quiz_answer_form">
        <input type= "text" name = "answer">
        <input type="submit" value="submit">
        </form>
        <br>
        Score:${what}%`
    }
    else if(data.type == "image")
    {
        quiz_question = 
        `<h3> ${data.question} </h3>
        <form id = "quiz_answer_form">
        <input type="radio" value="${data.choices[0]}" name = "answer"></input>
        <img src="${data.choices[0]}"><br>
        <input type="radio" value="${data.choices[1]}" name = "answer"></input>
        <img src="${data.choices[1]}"><br>
        <input type="radio" value="${data.choices[2]}" name = "answer"></input>
        <img src="${data.choices[2]}"><br>
        <input type= "submit" value = "submit">
        </form>
        Score:${what}%
        `
    }
        //document.getElementById().innerHTML= ""
    
        console.log(quiz_question)
    return quiz_question
}

function generateQuiz(data){
    console.log(appState.timePassed)
    quiz_question=generateQuestion(data[appState.counter]);
    appState.correctAnswerForCurrentQuestion=data[appState.counter].answer;
    appState.feedback=data[appState.counter].reason;
    console.log(appState.feedback);
    //console.log(appState.correctAnswerForCurrentQuestion);
    document.querySelector("#start").style.display = 'none';
    document.querySelector("#feedback_view").style.display= 'none';
    document.querySelector("#quiz_view").innerHTML= generateQuestion(data[appState.counter]);
    document.querySelector("#quiz_view").style.display= 'block';
    if(appState.counter==0)
    {
        timer();
    }
    
    document.querySelector("#quiz_view").onsubmit =  () =>{
        appState.selectedAnswer=document.forms["quiz_answer_form"]["answer"].value;
        console.log(appState.selectedAnswer)
        check(appState.correctAnswerForCurrentQuestion, appState.selectedAnswer)
        //feedback(response,data[i].reason)
       // document.querySelector("#quiz_view").style.display = 'none';
        //document.querySelector("#feedback_view").innerHTML= feedback_text;
        return false;
    }
}

function check(rightAnswer,userAnswer)
{
    document.querySelector("#quiz_view").style.display='none';
    document.querySelector("#feedback_view").style.display='none';
    console.log(rightAnswer);
    console.log(userAnswer);
    if(rightAnswer== userAnswer){
        appState.correct=appState.correct+1;
        appState.counter=appState.counter+1;
        goodFeedback()
    }
    else{
        appState.incorrect=appState.incorrect+1;
        appState.counter=appState.counter+1;
        badFeedback()
        
    }
}
function goodFeedback()
{
    let a= getRandomInt(3);
    console.log(a);
    document.querySelector("#quiz_view").style.display='none';
    document.querySelector("#feedback_view").style.display='block';
    if(a==0)
    {
        document.querySelector("#feedback_view").innerHTML=`<h1>Nice!</h1>`
        $('#feedback_view').delay(1000).fadeOut(300);
    }
    else if(a==1)
    {
        document.querySelector("#feedback_view").innerHTML=`<h1>Cool!</h1>`
        $('#feedback_view').delay(1000).fadeOut(300);
    }
    else if(a==2)
    {
        document.querySelector("#feedback_view").innerHTML=`<h1>Brilliant!</h1>`
        $('#feedback_view').delay(1000).fadeOut(300);
    }
    // document.querySelector("#feedback_view").innerHTML=`<h1>Nice</h1>`
    // $('#feedback_view').delay(1000).fadeOut(300);

    setTimeout(function() {
        if (appState.counter<appState.quizLength){
            getQuiz();
        }
        else {
            console.log("finished")
            console.log(appState)
            endingscreen()
        }
    },1500)
}
function badFeedback()
{
    document.querySelector("#quiz_view").style.display='none';
    document.querySelector("#feedback_view").style.display='block';
    if(appState.counter<appState.quizLength){
        
    document.querySelector("#feedback_view").innerHTML=`<h1>Incorrect</h1>
     <p> ${appState.feedback} </p>
     <input type ="button" onclick=getQuiz() value = "Got It"> `
    }
    else{
        document.querySelector("#feedback_view").innerHTML=`<h1>Incorrect</h1>
        <p> ${appState.feedback} </p>
        <input type="button" onclick=endingscreen() value = "Got It">`
    }
}
//write logic for finding length with of the brought in quiz with the async function
function endingscreen()
{
    clearInterval(setTime(),1000)
    console.log("does it even get here what is going on")
    document.querySelector("#quiz_view").style.display='none';
    document.querySelector("#feedback_view").style.display='none';
    document.querySelector("#quiz_complete").style.display='block';
    let grade=(appState.correct/appState.quizLength)
    let percentage = grade*100
    let cleanPercentage=percentage.toFixed(2)
    if(cleanPercentage >=80)
    {
    document.querySelector("#quiz_complete").innerHTML= 
    `<h1> ${appState.name}, you have passed the test </h1><br>
    <h4> Your Score: ${percentage}%</h4><br>
    <ul>Correct: ${appState.correct}
    <ul>Incorrect: ${appState.incorrect}
    <ul> Time: ${appState.completedTime}
    <input type = "button" onclick= retake() value= "Retake Quiz"> <input type= "button" onclick=other() value= "Take the Other Quiz">
    `
    }
    else
    {
    document.querySelector("#quiz_complete").innerHTML= 
    `<h1> ${appState.name}, you have failed the test </h1><br>
    <h4> Your Score: ${percentage}%</h4><br>
    <ul>Correct: ${appState.correct}
    <ul>Incorrect: ${appState.incorrect}
    <ul> Total Seconds to complete: ${appState.timePassed}
    <input type = "button" onclick= retake() value= "Retake Quiz"> <input type= "button" onclick=other() value= "Take the Other Quiz">
    `
    }
}
// take off displays
function retake()
{
    appState.counter=0;
    appState.correct=0;
    appState.incorrect=0;
    appState.currentScore=0;
    document.querySelector("#quiz_complete").style.display='none'
    getQuiz()
}
function other()
{
    if(appState.quizno=="quiz2")
    {
        appState.quizno="quiz1";
    }
    else
    {
        appState.quizno="quiz2";
    }
    //appState.quizno="quiz2";
    appState.counter=0;
    appState.correct=0;
    appState.incorrect=0;
    appState.currentScore=0;
    document.querySelector("#quiz_complete").style.display='none'
    getQuiz()
}


//setInterval(setTime, 1000);

// function setTime() {
//     var minutesLabel = document.getElementById("minutes");
//     var secondsLabel = document.getElementById("seconds");
//   ++appState.timePassed;
//   secondsLabel.innerHTML = pad(appState.timePassed % 60);
//   minutesLabel.innerHTML = pad(parseInt(appState.timePassed / 60));

//   appState.completedTime=minutesLabel+ ":"+ secondsLabel; 
// }
function timer(){
    clearInterval(time);
    let seconds = 0;

    time = setInterval(() => {
        seconds++;
        hours =  Math.floor(seconds/3600);
        minutes = Math.floor(seconds/60);
        document.querySelector("#timer").textContent=`Timer: ${minutes}:${seconds%60}`
    }, 1000)

}
// function pad(val) {
//   var valString = val + "";
//   if (valString.length < 2) {
//     return "0" + valString;
//   } else {
//     return valString;
//   }
// }
 function getRandomInt(max){

     return Math.floor(Math.random()*Math.floor(max));

 }

