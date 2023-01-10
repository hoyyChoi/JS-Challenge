const quizData = [
    {
        question:'how old is Florin?',
        a: '10',
        b: '17',
        c:'26',
        d:'110',
        correct: 'c'
    },
    {
        question:'what is the most used programing language in 2019?',
        a:'java',
        b:'c',
        c:'python',
        d:'javascript',
        correct:'d'
    },
    {
        question:'who is the president of US?',
        a:'florin',
        b:'donald',
        c:'ivan',
        d:'mihai',
        correct:'b'
    },{
        question:'what does HTML stand for?',
        a:'hypertext markup language',
        b:'cascading style sheet',
        c:'jason object notation',
        d:'helicopter terminal ',
        correct:'a'
    },{
        question:'what year was javascript launched?',
        a:'2020',
        b:'2019',
        c:'2018',
        d:'none of the above',
        correct:'d'
    }
]

const answerEls = document.querySelectorAll(".answer")
const quiz = document.getElementById('quiz')
const questionEl = document.getElementById('question')
const a_text = document.getElementById("a_text")
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuestion = 0;
let score = 0


loadQuiz();

function loadQuiz(){
    deselectAnswers()
    const currentQuestionData = quizData[currentQuestion]
    questionEl.innerText =currentQuestionData.question
    a_text.innerText = currentQuestionData.a;
    b_text.innerText = currentQuestionData.b;
    c_text.innerText = currentQuestionData.c;
    d_text.innerText = currentQuestionData.d;
    
    
}

function getSelected(){
    
    let answer = undefined
    answerEls.forEach((answerEl)=>{
        if(answerEl.checked){
           answer = answerEl.id;
        }
    })
    return answer
}
function deselectAnswers(){
    answerEls.forEach((answerEl)=>{
        if(answerEl.checked){
           answerEl.checked = false;
        }
    })
}


submitBtn.addEventListener("click",()=>{
    
    

    const answer = getSelected()
    if(answer){
        if(answer === quizData[currentQuestion].correct){
            score++
        }
        currentQuestion++; 
        if(currentQuestion<quizData.length){
            loadQuiz()
        }else{
            quiz.innerHTML = `<h2>you answer correctly at ${score}/${quizData.length}</h2>
                               <button onclick="location.reload()">reload</button>`
        }
    }else{
        alert("겂을 입력하시오.")
    }
    
})