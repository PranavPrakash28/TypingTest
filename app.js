let boxes =  document.querySelectorAll(".box");
let resetBtn =  document.querySelector("#reset-btn");
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let draw = document.querySelector('#draw-msg');

let turnO =  true;// player x and player o

let count = 0;
let winPatterns =[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]
];

const resetGame =()=>{
 turnO = true;
 enableBoxes();
 msgContainer.classList.add("hide");
 draw.classList.add("hide")
 count = 0 ;

}
boxes.forEach((box) => {
    box.addEventListener('click',()=> {
        count += 1;
        console.log("count:", count);
        // console.log("Box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        
    });
    
});

const disableBoxes = ()=>{
     for(let box of boxes){
        box.disabled = true;
     }
};


const enableBoxes = ()=>{
    for(let box of boxes){
       box.disabled = false;
       box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText =`Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
   for(let pattern of winPatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != "") {
        if (pos1val === pos2val && pos2val === pos3val) {
            console.log("winner" , pos1val);
            showWinner(pos1val);
            return;
        }
    }
   }
   if (count === 9 ) {
     showDraw();
   }
};

const showDraw = () =>{
    count = 0 ;
    // draw.innerText =`Draw Match! , Play Again!!`;
    draw.classList.remove("hide");
    resetBtn.classList.add("hide");
    // newGameBtn.classList.remove("hide");
    disableBoxes();
    msg.innerText =`Draw Match ! , Play Again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
}



newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click',resetGame);

resetGame();