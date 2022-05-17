const rows =20;
const cols = 100;
let timer;
const timerRep = 1;
const grid=new Array(rows);
let playing =false;
let clasey = "";

initialize=()=>
{
    initTable();
    initBtns();
    for(let i=0;i<rows;i++)
    {
            grid[i]= new Array(cols);
    }
    for(let i=0;i<rows;i++)
        for(let j=0;j<cols;j++)
        {
            grid[i][j]=0;
        }
    const cell =document.getElementById(1+"_"+1);
    cell.style.color+='background-color:yellow';
}
initTable=()=>
{
    const container = document.getElementById("gridContainer");
    const table = document.createElement("table");
    console.log("created table")
    for(let i=0;i<rows;i++)
    {
        const tr = document.createElement("tr");

        for(let j=0;j<cols;j++)
        {
            const td = document.createElement("td");
            td.setAttribute("id",i+"_"+j)
            td.setAttribute("class","white")
            td.textContent="";
            td.addEventListener("click",function (){
                cellClickHandler(td.getAttribute("class"),i,j);
            })
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    container.appendChild(table);
}
initBtns=()=>
{
    const startBtn = document.getElementById("start");
    startBtn.onclick = startBtnClickHandler;
    const resetBtn = document.getElementById("reset");
    resetBtn.onclick = resetBtnClickHandler;
}
startBtnClickHandler=()=>
{
    const startBtn = document.getElementById("start");
    if(playing) {
        playing=false;
        startBtn.textContent="Continue";
    }
    else {
        playing=true;
        startBtn.textContent="Pause";
        console.log("started")
        start();
    }
}
resetBtnClickHandler=()=>
{
    const startBtn = document.getElementById("start");
    for(let i=0;i<rows;i++)
        for(let j=0;j<cols;j++)
        {
            const cell = document.getElementById(i+"_"+j);

                cell.setAttribute("class","white");

            grid[i][j]=0;
        }
    playing=false;
    startBtn.textContent="Start";
}
cellClickHandler=(cell,x,y)=>
{
    const antCell = document.getElementById(x+"_"+y);
    clasey = antCell.getAttribute("class");
    antCell.setAttribute("class","ant");
    grid[x][y]=1;

}
let reps=0;
start=()=>
{
    antAlgo();
    if(playing) {
         timer = setTimeout(start, 0);

        console.log(reps + "reps completed");
    }

}
const ANTUP=0;
const ANTLEFT=3;
const ANTRIGHT=1;
const ANTDOWN=2;
let dir = ANTUP;
turnRight=()=>
{
    //dir = (dir + ANTLEFT) % ANTLEFT;
    dir++;
    if(dir>ANTLEFT)
    {
        dir=ANTUP;
    }

}
turnLeft=()=>
{
    //dir = (dir + ANTLEFT) % ANTLEFT;
    dir--;
    if(dir<ANTUP)
    {
        dir=ANTLEFT;
    }

}
let glob = "white";
moveForward=(i,j)=>
{
    if(dir===ANTUP)
    {
        let a = (i-1+rows)%rows;
        grid[a][j]=1;
        const cell = document.getElementById(a+"_"+j);
        glob = cell.getAttribute("class");
        cell.setAttribute("class","ant");
    }
    else if(dir===ANTLEFT)
    {
        let a = (j-1+cols)%cols;
        grid[i][a]=1;
        const cell = document.getElementById(i+"_"+a);
        glob = cell.getAttribute("class");
        cell.setAttribute("class","ant");
    }
    else if(dir===ANTRIGHT)
    {
        let a = (j+1+cols)%cols;
        grid[i][a]=1;
        const cell = document.getElementById(i+"_"+a);
        glob = cell.getAttribute("class");
        cell.setAttribute("class","ant");
    }
    else if(dir===ANTDOWN)
    {
        let a = (i+1+rows)%rows;
        grid[a][j]=1;
        const cell = document.getElementById(a+"_"+j);
        glob = cell.getAttribute("class");
        cell.setAttribute("class","ant");
    }



}
antAlgo=()=>
{

    for(let i=0;i<rows;i++)
        for(let j=0;j<cols;j++)
        {

            if(grid[i][j]===1)

            {
                const cell = document.getElementById(i+"_"+j);
                clasey = cell.getAttribute("class");
                cell.setAttribute("class","ant");
                if(glob==="white")
                {


                    console.log(     cell.getAttribute("class"));
                    turnRight();
                    console.log("turned right");
                    grid[i][j]=0;

                    console.log(cell.getAttribute("class"))
                    moveForward(i,j);
                    reps++;
                    cell.setAttribute("class","black");
                    return;
                }
                if(glob==="black")
                {
                    cell.setAttribute("class","ant");
                    reps++;
                    turnLeft();
                    console.log("turned left");
                    grid[i][j]=0;

                    moveForward(i,j);
                    cell.setAttribute("class","white");
                    return;
                }
            }
        }
}
window.onload=initialize;