const gameInfo = document.querySelector(".playerInfo")
const boxes= document.querySelectorAll(".box")
const newGame=document.querySelector(".newGame")

let player='O';
let cells=[];
const winningPositions=[[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]
let flag=0
let temp=true

function startState(){
    player='O';
    cells=["","","","","","","","",""]
    newGame.classList.remove("active")
    gameInfo.innerText= `Current Player - ${player}`
}

function reset(){
    temp=true
    cells=["","","","","","","","",""]
    boxes.forEach(element=>{
        element.innerText=""
        element.classList.remove("greenBg")
    })
    gameInfo.innerText= `Current Player - ${player}`
    flag=0
    boxes.forEach(element=>{
        element.style.cssText="cursor:pointer"
    })
}

startState()
let index=0

function checkwin(){
    let answer=""
    winningPositions.forEach(value=>{
        value.forEach(element=>{
            answer=answer+ cells[element]
            if(answer==="XXX" || answer==="OOO"){
                index=winningPositions.indexOf(value)
                winningPositions[index].forEach(element=>{
                    boxes[element].classList.add("greenBg")
                    newGame.classList.add("active")
                    temp=false
                })
            }
        },
        answer=""
        )
    })
}

function handleClick(index){
    if(boxes[index].innerText == "" && temp ){
        cells[index]=player
        flag++
        boxes[index].innerText=player;
        boxes[index].style.cssText="cursor:default"
        checkwin()
        if(flag!=9 && temp==true){
            if(player==='O'){
                player='X'
            }
            else{
                player='O'
            }
            gameInfo.innerText= `Current Player - ${player} `
        }
        else{
            if(temp==false){
                setTimeout(function(){alert(`Player ${player} wins, Start new Game`)},100)
            }
            else{
                newGame.classList.add("active")
                setTimeout(function(){
                    alert("Game Tied,Start a new game")    // Set Timeout is added because witjout this, UI is not being updated and alert is shown
                },100)
            }
        }
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index)
    })
})

newGame.addEventListener("click",reset)