const rows =300;
const cols = 300;
let timer;
const timerRep = 1;
const grid=new Array(rows);
const antGrid=new Array(rows);
let playing =false;
let clasey = "";
let  numOfColors;
let value = "RL";
let colors=new Array(numOfColors);
initialize=()=>
{ initBtns();
    initTable();

    randColors();
    for(let i=0;i<rows;i++)
    {
        grid[i]= new Array(cols);
        antGrid[i]=new Array(cols);
    }
    for(let i=0;i<rows;i++)
        for(let j=0;j<cols;j++)
        {
            grid[i][j]=0;
            antGrid[i][j]=0;
        }

}
randColors=()=>
{

    for(let i=0;i<numOfColors;i++)
    {
        colors[i]='#'+(Math.random().toString(16)+'00000').slice(2,8);
    }

}
initTable=()=>
{
    const container = document.getElementById("gridContainer");
    const table = document.createElement("table");
    const algo = document.getElementById("algos");
    //value = algo.options[algo.selectedIndex].text;
    numOfColors = value.length;
    console.log(value);
    console.log(numOfColors);


    for(let i=0;i<rows;i++)
    {
        const tr = document.createElement("tr");

        for(let j=0;j<cols;j++)
        {
            const td = document.createElement("td");
            td.setAttribute("id",i+"_"+j)
            td.textContent="";
            td.addEventListener("click",function (){
                cellClickHandler(i,j);
            })
            td.style.backgroundColor = "black";
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
selectClickHandler=()=>
{
    const algo = document.getElementById("algos");
    value = algo.options[algo.selectedIndex].text;
    console.log("new"+value);
    numOfColors=value.length;
    console.log("new"+numOfColors);
    randColors();
    console.log(colors);
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


            cell.style.backgroundColor = "red";

            grid[i][j]=0;
        }
    playing=false;
    startBtn.textContent="Start";
}
cellClickHandler=(x,y)=>
{
    const antCell = document.getElementById(x+"_"+y);
    //clasey = antCell.getAttribute("class");
    //antCell.setAttribute("class","ant");
    antGrid[x][y]=1;
    antCell.style.backgroundColor = "red";
}
let reps =0;
start=()=>
{
    applyAlgo();
    if(playing) {
        if(reps%600===0) {
            console.log(reps++ + "reps completed");
            timer = setTimeout(start,timerRep);
        }
        else
        { console.log(reps++ + "reps completed");
            start()
        }
    }

}
applyAlgo=()=> {
    value.split('');
    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++){

            if(antGrid[i][j]===1)
            {
                for(let t=0;t<colors.length;t++)
                {
                    if(grid[i][j]===t)

                    {
                        if(value[t]==='R')
                        {
                           // console.log("value[t]==='R' at"+i+"_"+j+"__"+t)
                            turnRight();
                            const cell = document.getElementById(i+"_"+j);


                            if(t===colors.length-1) {
                                grid[i][j] = 0;
                                cell.style.backgroundColor = colors[0];
                            }
                            else {
                                grid[i][j] = t + 1;
                                cell.style.backgroundColor = colors[t + 1];
                            }
                            moveForward(i,j);
                            antGrid[i][j]=0;
                           // console.log("end")
                            return;
                        }
                        if(value[t]==='L')
                        {
                           // console.log("value[t]==='L' at"+i+"_"+j+"__"+t)
                            turnLeft();
                            const cell = document.getElementById(i+"_"+j);
                            if(t===colors.length-1) {
                                grid[i][j] = 0;
                                cell.style.backgroundColor = colors[0];
                            }
                            else {
                                grid[i][j] = t + 1;
                                cell.style.backgroundColor = colors[t + 1];
                            }
                            moveForward(i,j);
                            antGrid[i][j]=0;
                           // console.log("end")
                            return;
                        }
                        return;
                    }
                }
            }
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
moveForward=(i,j)=> {


    if (dir === ANTUP) {
        let a = (i - 1 + rows) % rows;
        antGrid[a][j] = 1;
        const cell = document.getElementById(a+"_"+j);
        cell.style.backgroundColor="red";

    } else if (dir === ANTLEFT) {
        let a = (j - 1 + cols) % cols;
        antGrid[i][a] = 1;
        const cell = document.getElementById(i+"_"+a);
        cell.style.backgroundColor="red";

    } else if (dir === ANTRIGHT) {
        let a = (j + 1 + cols) % cols;
        antGrid[i][a] = 1;
        const cell = document.getElementById(i+"_"+a);
        cell.style.backgroundColor="red";

    } else if (dir === ANTDOWN) {
        let a = (i + 1 + rows) % rows;
        antGrid[a][j] = 1;
        const cell = document.getElementById(a+"_"+j);
        cell.style.backgroundColor="red";

    }
}

window.onload=initialize;