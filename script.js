var mode=localStorage.getItem("mode");
if(mode){
    if(mode==="offline"){
        console.log(mode);
    }

    else if(mode==="AI"){
        console.log(mode);
    }

    else if(mode==="online"){
        console.log(mode);
    }
}
const guiBoard=document.getElementById("board");
const playBtn=document.getElementById("playBtn");
const label=document.getElementById("label");
const coordinates={
    start:null,
    end:null,
}

let cells=guiBoard.children;
let board=[
    [cells[0],cells[1],cells[2]],
    [cells[3],cells[4],cells[5]],
    [cells[6],cells[7],cells[8]],
];

let player1={letter:"X",color:"red"};
let player2={letter:"O",color:"blue"};
let players=[player1,player2];
let currentPlayer=players[Math.floor(Math.random()*players.length)];//


function addEvent(cells){
    for (let cell of cells) {
        cell.addEventListener('click',()=>{
            cell.innerText=currentPlayer.letter;
            cell.style.color=currentPlayer.color;
            checkForWin()
            currentPlayer=(currentPlayer===player1) ? (player2) : (player1);
            
        }, { once: true })
    }
    
}

function isEqual(a,b,c){
    let equal=(a.innerText===b.innerText) && (b.innerText===c.innerText) &&(a.innerText!=="");
    if(equal){
        coordinates.start=a;
        coordinates.end=c;
    }
    return equal;
}

function checkForWin(){
    //checkrows
    if(isEqual(board[0][0],board[0][1],board[0][2])||
    isEqual(board[1][0],board[1][1],board[1][2])||
    isEqual(board[2][0],board[2][1],board[2][2])){
        drawLine("row",currentPlayer.color)
        guiBoard.style.pointerEvents="none";
        label.style.opacity=1;
        label.style.color=currentPlayer.color;
        label.innerText=`${currentPlayer.letter} wins!`;
        playBtn.classList.remove('hidden');
    }
    //check cols
    else if(isEqual(board[0][0],board[1][0],board[2][0])||
    isEqual(board[0][1],board[1][1],board[2][1])||
    isEqual(board[0][2],board[1][2],board[2][2])){
        drawLine("col",currentPlayer.color)
        guiBoard.style.pointerEvents="none";
        label.style.opacity=1;
        label.style.color=currentPlayer.color;
        label.innerText=`${currentPlayer.letter} wins!`;
        playBtn.classList.remove('hidden');
    }
    //check diagnol 
    else if(isEqual(board[0][0],board[1][1],board[2][2])){
        drawLine("diagnolleft",currentPlayer.color);
        guiBoard.style.pointerEvents="none";
        label.style.opacity=1;
        label.style.color=currentPlayer.color;
        label.innerText=`${currentPlayer.letter} wins!`;
        playBtn.classList.remove('hidden');
    }
    else if(isEqual(board[0][2],board[1][1],board[2][0])){
        drawLine("diagnolright",currentPlayer.color);
        guiBoard.style.pointerEvents="none";
        label.style.opacity=1;
        label.style.color=currentPlayer.color;
        label.innerText=`${currentPlayer.letter} wins!`;
        playBtn.classList.remove('hidden');
    }

    else{
        for(let i of board){
            for(let j of i){
                if(j.innerText===""){
                    return
                }
            }
        }
        label.style.opacity=1;
        label.style.color="white";
        label.innerText="Draw!";
        playBtn.classList.remove('hidden');
    }

}

function drawLine(mode,color){
    let main=document.querySelector("#main");
    let parent={
        xleft:guiBoard.getBoundingClientRect().left,
        ytop:guiBoard.getBoundingClientRect().top,
        xright:guiBoard.getBoundingClientRect().right,
        ybottom:guiBoard.getBoundingClientRect().bottom,
    }
    let start = {
        xleft:coordinates.start.getBoundingClientRect().left-parent.xleft,
        ytop:coordinates.start.getBoundingClientRect().top-parent.ytop,
        xright:coordinates.start.getBoundingClientRect().right-parent.xleft,
        ybottom:coordinates.start.getBoundingClientRect().bottom-parent.ytop,
    };
    let end = {
        xleft:coordinates.end.getBoundingClientRect().left-parent.xleft,
        ytop:coordinates.end.getBoundingClientRect().top-parent.ytop,
        xright:coordinates.end.getBoundingClientRect().right-parent.xleft,
        ybottom:coordinates.end.getBoundingClientRect().bottom-parent.ytop,
    };

    const svg=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    const line=document.createElementNS("http://www.w3.org/2000/svg", 'line');

    line.setAttribute("stroke", color);
    line.setAttribute("fill", color);
    line.setAttribute("style","stroke-width:4");

    if(mode==="diagnolleft"){
        line.setAttribute("x1", start.xleft);
        line.setAttribute("y1", start.ytop);
        line.setAttribute("x2", (end.xright));
        line.setAttribute("y2", (end.ybottom));
    }
    if(mode==="diagnolright"){
        line.setAttribute("x1", start.xright);
        line.setAttribute("y1", start.ytop);
        line.setAttribute("x2", (end.xleft));
        line.setAttribute("y2", (end.ybottom));
    }
    if(mode==="row"){
        let half=(start.ybottom-start.ytop)/2
        line.setAttribute("x1", start.xleft);
        line.setAttribute("y1", (start.ytop+half));
        line.setAttribute("x2", (end.xright));
        line.setAttribute("y2", (end.ytop+half));
    }
    if(mode==="col"){
        let half=(start.xright-start.xleft)/2
        line.setAttribute("x1", (start.xleft+half));
        line.setAttribute("y1", (start.ytop));
        line.setAttribute("x2", (end.xleft+half));
        line.setAttribute("y2", (end.ybottom));
    }
    svg.appendChild(line);
    main.insertBefore(svg, main.children[0]);
}

addEvent(cells);