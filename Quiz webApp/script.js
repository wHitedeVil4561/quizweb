const questions = [
    {
        numb: 1,
        question: "Which of the following undergoes nucleophilic substitution exclusively by SN 1 mechanism?",
        answer: "Benzyl chloride",
        option: [
            "Benzyl chloride",
            "Ethyl chloride",
            "Chlorobenzene",
            "Isopropyl chloride"
        ]
    },
    {
        numb: 2,
        question: "The synthesis of alkyl fluoride is best accomplished by",
        answer: "Swartz reaction",
        option: [
            "Finkelstein reaction",
            "Swartz reaction",
            "Free radical fluorination",
            "Sandmeyers reaction"
        ]
    },
    {
        numb: 3,
        question: "How many chiral compounds are possible on monochlorination of 2-methyl butane?",
        answer: "4",
        option: [
            "2",
            "4",
            "6",
            "8"
        ]
    },
    {
        numb: 4,
        question: "SN1 reaction of alkyl halides lead to",
        answer: "Racemisation",
        option: [
            "Retention of configuration",
            "Racemisation",
            "Inversion of configuration",
            "None of these"
        ]
    }

];
const start_btn=document.querySelector('.btn-div button');
const info_box=document.querySelector('.rules');
const exit_btn=info_box.querySelector('.button .btn1');
const continue_btn = info_box.querySelector('.button .btn2');

const quiz_box=document.querySelector('.quiz-box');
const next_btn = document.querySelector('.next-btn');
const optoin_list = document.querySelector('.option-list');
const timerCount=quiz_box.querySelector('.timer .timer-sec');
const showResult=document.querySelector('.result-box');
const restart=showResult.querySelector('.button1 .restart-quiz');
const quit = showResult.querySelector('.button1 .exit-quiz');




let tickicon =`<div class="icon tick"><i class="far fa-check-circle fa-lg"></i></div>`;
let crossicon =`<div class="icon cross"><i class="far fa-times-circle fa-lg"></i></div>`;
let counter;
let timevalue=15;
let userscore=0;
let queCount = 0;
let que_numb = 1;

function showQuestion(index) {
    const que_text = document.querySelector('.que-text');


    let que_tag = `<span>` + questions[index].numb + ". " + questions[index].question + `</span>`;
    let option_tag = `<div class="option"><span>` + questions[index].option[0] + `</span></div>`
        + `<div class="option"><span>` + questions[index].option[1] + `</span></div>`
        + `<div class="option"><span>` + questions[index].option[2] + `</span></div>`
        + `<div class="option"><span>` + questions[index].option[3] + `</span></div>`;
    que_text.innerHTML = que_tag;
    optoin_list.innerHTML = option_tag;
    const option = optoin_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionselected(this)");
    }
}

function optionselected(answer) {
    clearInterval(counter);
    let userans=answer.textContent;
    let alloptions=optoin_list.children.length;
    let correctans=questions[queCount].answer;
    if(userans==correctans){
        userscore++;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickicon);
        console.log('Answer is correct');
    }
    else{
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML("beforeend", crossicon);
        console.log('Answer is wrong');
        for (let i = 0; i < alloptions; i++) {
            if(optoin_list.children[i].textContent==correctans){
                optoin_list.children[i].setAttribute("class","option correct");
                optoin_list.children[i].insertAdjacentHTML("beforeend", tickicon);
            }
            
        }
    }
    for (let i = 0; i < alloptions; i++) {
        optoin_list.children[i].classList.add("disabled");
        
    }
    next_btn.style.display="block";
} 
function queCounter(index) {
    const bottom_que_counter = document.querySelector('.total-que');
    let bottom_que_counter_tag = `<span><p>` + que_numb + `</p><p>of</p><p>` + questions.length + `</p><p>Question</p></span>`;
    bottom_que_counter.innerHTML = bottom_que_counter_tag;

}
function startTimer(time) {
    counter=setInterval((timer) => {
            timerCount.textContent=time;
            time--;
            if (time<9) {
                let addzero=timerCount.textContent;
                timerCount.textContent="0"+addzero;
            }
            if (time<0) {
                clearInterval(counter);
                timerCount.textContent = "00"; 
                let alloptions = optoin_list.children.length;
                let correctans = questions[queCount].answer;
                for (let i = 0; i < alloptions; i++) {
                    if (optoin_list.children[i].textContent == correctans) {
                        optoin_list.children[i].setAttribute("class", "option correct");
                        optoin_list.children[i].insertAdjacentHTML("beforeend", tickicon);
                    }

                }
                for (let i = 0; i < alloptions; i++) {
                    optoin_list.children[i].classList.add("disabled");

                }
                next_btn.style.display = "block";
            }
    }, 1000);
}
function showresult() {
    info_box.classList.remove('activeInfo');
    quiz_box.classList.remove('activequiz');
    showResult.classList.add('activeResult');
    const score_card = showResult.querySelector('.scorearea');
    if (userscore > 3) {
        let score_tag = `<span>Congrats, You got <p>` + userscore + `</p>/<p>` + questions.length + `</p></span>`;
        score_card.innerHTML = score_tag;
    }
    else if (userscore >1) {
        let score_tag = `<span>Nice, You got <p>` + userscore + `</p>/<p>` + questions.length + `</p></span>`;
        score_card.innerHTML = score_tag;
    }
    else {
        let score_tag = `<span>Sorry, You got only<p>` + userscore + `</p>/<p>` + questions.length + `</p></span>`;
        score_card.innerHTML = score_tag;
    }


}

start_btn.onclick=()=>{
    info_box.classList.add('activeInfo');
}
exit_btn.onclick = () => {
    info_box.classList.remove('activeInfo');
}
continue_btn.onclick = () => {
    info_box.classList.remove('activeInfo');
    quiz_box.classList.add('activequiz');
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    next_btn.style.display = "none";
}




next_btn.onclick = () => {
    if(queCount<questions.length-1){
        queCount++;
        que_numb++;
        showQuestion(queCount);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timevalue);
        next_btn.style.display = "none";
    }
    else{
        console.log('Quiz Completed');
        showresult();
    }
}
restart.onclick = () => {
   window.location.reload();

}
quit.onclick = () => {
    window.location.reload();
}

