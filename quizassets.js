const appState={
    counter:0,
    correct:0,
    incorrect:0,
    name:'',
    quizno: '',
    selectedAnswer:''
    
}
document.addEventListener('DOMContentLoaded', () =>{
    

})
let getQuiz= async(url) =>{
    
        const response= await fetch("https://my-json-server.typicode.com/mmmnice/indiv_project_db/" +appState.quizno)
        const result = await response.json();
        console.log(result);
        generateQuiz(result);
}

function getinformation(){
    var name=document.getElementById('name').value;
    var quiz=document.getElementById('quizField').value;
    

    appState.name=name;
    appState.quizno=quiz;
    console.log(appState);
    //var thequiz=
    getQuiz();
   // generateQuiz(thequiz);
   
   
   // document.querySelector("#start").style.display='none';
   // document.querySelector("#quiz_view").innerHTML=`<h1> DOES THIS WORK </h1>`
}
function generateQuestion(data){
    //appState.current_correct_answer=data.correct_answer
    console.log(data)
    if(data.type=="multiple choice")
    {
        quiz_question = 
        `<h3>${data.question}</h3>
        <form id = "quiz_answer_form">
            <input type="radio" value = "${data.choices[0]}" name = "answer1"></input>
            <label for = "answer1"> ${data.choices[0]} </label><br>
            <input type="radio" value = "${data.choices[1]}" name = "answer2"></input>
            <label for = "answer2"> ${data.choices[1]} </label><br>
            <input type="radio" value = "${data.choices[2]}" name = "answer3"></input>
            <label for = "answer3"> ${data.choices[2]} </label><br>
            <input type = "submit" value = "submit"></input>
           
        </form>`
        
    }
    
    else if(data.type= "short answer")
    {
        quiz_question =
        `<h3> ${data.question}</h3>
        <form id= quiz_answer_form>
        <input type= "text">
        <input type="submit" value="submit">
        </form>`

    }
    else if(data.type = "true false")
    {
        quiz_question=
        `<h3> ${data.question} </h3>
        <form id= "quiz_answer_form">
        <input type = "radio" value = "true"> True</input><br>
        <input type = "radio" value = "false> False </input>
        </form>`
    }
        //document.getElementById().innerHTML= ""
    
        console.log(quiz_question)
    return quiz_question
}

function generateQuiz(data){
    quiz_question=generateQuestion(data[appState.counter]);
    document.querySelector("#start").style.display = 'none';
    document.querySelector("#feedback_view").style.display= 'none';
    document.querySelector("#quiz_view").style.display= 'block';
    document.querySelector("#quiz_view").innerHTML= generateQuestion(data[appState.counter]);
    
}



//</form>
//     correct: 0,
//     incorrect: 0,
//     name: ''
// }

// document.addEventListener('DOMContentLoaded', () =>{
    
//     if(appstate.name=='')
//     {
//     widget_html= render_view("#FirstName");
//     document.querySelector("#app_widget").innerHTML = widget_html;
//     }
//     else
//     {
//         widget_html=render_view("names");
//         document.querySelector("#app_widget").innerHTML= widget_html;
//     }


// })


// const submitName= () =>{
//     var name=document.getElementById('fname').value;
//     appState.name=name;
//     console.log(appState);
    
// }
// const render_view = (view) => {
//     template_source= document.querySelector(view).innerHTML;

//     var template = Handlebars.compile(template_source);

//     var model={first_name:"thicc",values:'name'};
   
//     var html_widget_element = template(model);

    //  return html_widget_element;

// }

// // const render_view = (view) => {
// //     template_source = document.querySelector(view).innerHTML

// //     var template = Handlebars.compile(template_source);

// //     var model = {
// //         first_name: 'Christoforos'

// //     }

// //     console.log(model)
    
// //     var html_widget_element=template(model)
// //     return html_widget_element
// // }